import { Request, Response } from "express";
import { eq, inArray, and, SQL } from "drizzle-orm";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { productTable } from "../db/productTable";
import { productImageTable } from "../db/productImageTable";
import { productDetailsTable } from "../db/productDetailTable";
import { productSubCategoryTable } from "../db/productSubCategoryTable";
import { brandTable } from "../db/brandTable";
import { productConditionTable } from "../db/productConditionTable";
import { cityTable } from "../db/cityTable";
import { districtTable } from "../db/districtTable";
import { communeTable } from "../db/communeTable";
import { usersTable } from "../db/usersTable";
import { productCategoryTable } from "../db/productCategoryTable";
import { AuthRequest } from "../types/AuthRequest";
import * as fs from 'fs';
import * as path from 'path';

const db = drizzle(process.env.DATABASE_URL!);

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const {
      name, price, description, productSubCategoryId, productBrandId,
      conditionId, cityId, districtId, communeId, address,
      discount, discountType, freeDelivery, vga, cpu, ram, storage,
      screenSize, taxTypeId, colorId, transmissionId, engineTypeId, bodyTypeId,
      latitude, longitude, contactName, email, phoneNumber1, phoneNumber2, phoneNumber3
    } = authReq.body;

    const userId = authReq.user.ID;
    const files = authReq.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ message: 'At least one image is required.' });
      return;
    }

    // 1. Create an entry in product_details table first
    const productDetailsResult = await db.insert(productDetailsTable).values({
      Username: contactName,
      Email: email,
      PhoneNumber: phoneNumber1,
      PhoneNumber2: phoneNumber2,
      PhoneNumber3: phoneNumber3,
    });

    const newProductDetailId = productDetailsResult[0].insertId;

    // 2. Use the new ID to create the product
    const result = await db.insert(productTable).values({
      Name: name,
      Price: price,
      Description: description,
      ProductSubCategoryID: productSubCategoryId,
      ProductBrandID: productBrandId,
      ConditionID: conditionId,
      CityID: cityId,
      DistrictID: districtId,
      CommuneID: communeId,
      Address: address,
      UserID: userId,
      Discount: discount === '' ? null : discount,
      DiscountAsPercentage: discountType === 'percent',
      IsFreeDelivery: freeDelivery === 'true',
      VgaID: vga,
      CpuID: cpu,
      RamID: ram,
      StorageID: storage,
      ScreenID: screenSize,
      TaxTypeID: taxTypeId,
      ColorID: colorId,
      TransmissionID: transmissionId,
      EngineTypeID: engineTypeId,
      BodyTypeID: bodyTypeId,
      Latitude: latitude,
      Longitude: longitude,
      IsActive: true,
      ProductDetailID: newProductDetailId, // Assign the new product detail ID
    });

    const newProductId = result[0].insertId;

    if (newProductId && files.length > 0) {
      const imageValues = files.map((file, index) => ({
        Photo: file.filename,
        ProductID: newProductId,
        SortOrder: index + 1,
      }));
      await db.insert(productImageTable).values(imageValues);
    }

    res.status(201).json({ success: true, productId: newProductId });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ... (existing createProduct function)

export const getUserProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.ID;
    if (!userId) {
      return res.status(401).json({ message: "User not found or not authenticated" });
    }

    const products = await db.select().from(productTable).where(eq(productTable.UserID, userId));

    if (products.length === 0) {
      return res.status(200).json([]);
    }

    const productIds = products.map(p => p.ID);
    
    const images = await db.select().from(productImageTable).where(inArray(productImageTable.ProductID, productIds));

    // Create a map for quick lookup of the first image for each product
    const imageMap = new Map<number, string>();
    images.forEach(image => {
      if (!imageMap.has(image.ProductID) && image.SortOrder === 1) {
        imageMap.set(image.ProductID, image.Photo);
      }
    });
     // If no image with SortOrder 1, fallback to any image
    images.forEach(image => {
        if (!imageMap.has(image.ProductID)) {
            imageMap.set(image.ProductID, image.Photo);
        }
    });

    const productsWithImages = products.map(product => {
      return {
        ...product,
        imageUrl: imageMap.get(product.ID) || null
      };
    });

    res.status(200).json(productsWithImages);
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ... (createProduct and getUserProducts functions remain unchanged)

export const getAllProducts = async (req: Request, res: Response) => {
  try {
  const { mainCategoryId, subCategoryId, brandId } = req.query;
     let products;
 
     // Build the query condition by starting with the base condition (IsActive = true)
     let condition: SQL<unknown> | undefined = eq(productTable.IsActive, true);
 
  if (brandId) {
  // If brandId is present, it's the most specific filter.
       condition = and(condition, eq(productTable.ProductBrandID, Number(brandId)));
     } else if (subCategoryId) {
  // If no brandId but subCategoryId is present, filter by that.
       condition = and(condition, eq(productTable.ProductSubCategoryID, Number(subCategoryId)));
     } else if (mainCategoryId) {
  // If only mainCategoryId is present, find all subcategories and filter by them.
  const subCategoryIds = await db
  .select({ id: productSubCategoryTable.ID })
  .from(productSubCategoryTable)
  .where(eq(productSubCategoryTable.ProductCategoryID, Number(mainCategoryId)));
 
  if (subCategoryIds.length === 0) {
  return res.status(200).json([]);
       }
  const ids = subCategoryIds.map(sc => sc.id);
       condition = and(condition, inArray(productTable.ProductSubCategoryID, ids));
     }
 
     products = await db.select().from(productTable).where(condition);
 
  if (products.length === 0) {
  return res.status(200).json([]);
     }
 
  const productIds = products.map(p => p.ID);
  
  const images = await db.select().from(productImageTable).where(inArray(productImageTable.ProductID, productIds));
 
  const imageMap = new Map<number, string>();
     images.forEach(image => {
  if (!imageMap.has(image.ProductID) && image.SortOrder === 1) {
         imageMap.set(image.ProductID, image.Photo);
       }
     });
      // If no image with SortOrder 1, fallback to any image
     images.forEach(image => {
         if (!imageMap.has(image.ProductID)) {
             imageMap.set(image.ProductID, image.Photo);
         }
     });
 
  const productsWithImages = products.map(product => {
  return {
  ...product,
         imageUrl: imageMap.get(product.ID) || null
       };
     });
 
     res.status(200).json(productsWithImages);
   } catch (error) {
     console.error("Error fetching all products:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 };



export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    const productQuery = await db
      .select({
        product: productTable,
        brand: brandTable,
        subCategory: productSubCategoryTable,
        mainCategory: productCategoryTable,
        condition: productConditionTable,
        city: cityTable,
        district: districtTable,
        commune: communeTable,
        contactDetails: productDetailsTable,
        seller: usersTable,
      })
      .from(productTable)
      .leftJoin(brandTable, eq(productTable.ProductBrandID, brandTable.ID))
      .leftJoin(productSubCategoryTable, eq(productTable.ProductSubCategoryID, productSubCategoryTable.ID))
      .leftJoin(productCategoryTable, eq(productSubCategoryTable.ProductCategoryID, productCategoryTable.ID))
      .leftJoin(productConditionTable, eq(productTable.ConditionID, productConditionTable.ID))
      .leftJoin(cityTable, eq(productTable.CityID, cityTable.ID))
      .leftJoin(districtTable, eq(productTable.DistrictID, districtTable.ID))
      .leftJoin(communeTable, eq(productTable.CommuneID, communeTable.ID))
      .leftJoin(productDetailsTable, eq(productTable.ProductDetailID, productDetailsTable.ID))
      .leftJoin(usersTable, eq(productTable.UserID, usersTable.ID))
      .where(eq(productTable.ID, productId));
      
    if (productQuery.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    const images = await db
      .select({
        ID: productImageTable.ID,
        Photo: productImageTable.Photo,
        SortOrder: productImageTable.SortOrder,
      })
      .from(productImageTable)
      .where(eq(productImageTable.ProductID, productId))
      .orderBy(productImageTable.SortOrder);

    const result = {
      ...productQuery[0],
      images: images,
    };

    res.status(200).json(result);

  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// ... (existing createProduct, getUserProducts, getAllProducts, getProductById functions)

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const userId = req.user.ID;

    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const productResult = await db.select().from(productTable).where(eq(productTable.ID, productId));
    const product = productResult[0];

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.UserID !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this product" });
    }

    const images = await db.select().from(productImageTable).where(eq(productImageTable.ProductID, productId));

    for (const image of images) {
      const imagePath = path.join('src/uploads/products', image.Photo);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${imagePath}`, err);
        }
      });
    }

    await db.delete(productImageTable).where(eq(productImageTable.ProductID, productId));
    await db.delete(productTable).where(eq(productTable.ID, productId));
    if (product.ProductDetailID) {
      await db.delete(productDetailsTable).where(eq(productDetailsTable.ID, product.ProductDetailID));
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};