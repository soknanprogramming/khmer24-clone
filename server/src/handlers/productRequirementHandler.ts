import { Request, Response } from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { productRequirementsTable } from "../db/productRequirementsTable";;

const db = drizzle(process.env.DATABASE_URL!);

export const productRequirementHandler = async (req: Request<{ subCategoryID: string }>, res: Response) => {
    const subCategoriesId = req.params.subCategoryID; // 👈 use params for GET

  const productRequirements = await db
    .select({
        productName: productRequirementsTable.ProductName,
        ProductBrand: productRequirementsTable.ProductBrand,
        TaxType: productRequirementsTable.TaxType,
        Condition: productRequirementsTable.Condition,
        Color: productRequirementsTable.Color,
        Transmission: productRequirementsTable.Transmission,
        EngineType: productRequirementsTable.EngineType,
        BodyType: productRequirementsTable.BodyType,
        Vga: productRequirementsTable.Vga,
        Ram: productRequirementsTable.Ram,
        Storage: productRequirementsTable.Storage,
        Screen: productRequirementsTable.Screen,
        Price: productRequirementsTable.Price,
        Discount: productRequirementsTable.Discount,
        IsFreeDelivery: productRequirementsTable.IsFreeDelivery,
        Description: productRequirementsTable.Description,
        City: productRequirementsTable.City,
        District: productRequirementsTable.District,
        Commune: productRequirementsTable.Commune,
        Address: productRequirementsTable.Address,
        Latitude: productRequirementsTable.Latitude,
        Longitude: productRequirementsTable.Longitude,
        CreatedDate: productRequirementsTable.CreatedDate,

    })



    .from(productRequirementsTable)
    .where(eq(productRequirementsTable.productSubCategoryID, Number(subCategoriesId)));

  res.status(200).json(productRequirements);
};
