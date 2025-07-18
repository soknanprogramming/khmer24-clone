import { Request, Response } from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { productTable } from "../db/productTable";
import { productImageTable } from "../db/productImageTable";
import { AuthRequest } from "../types/AuthRequest";

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
      latitude, longitude
    } = authReq.body;

    const userId = authReq.user.ID;
    const files = authReq.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ message: 'At least one image is required.' });
      return;
    }

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
      Discount: discount,
      DiscountAsPercentage: discountType === 'percent',
      IsFreeDelivery: freeDelivery,
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
      CreatedDate: new Date(),
      IsActive: true,
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