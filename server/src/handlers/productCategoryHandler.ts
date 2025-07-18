import { Request, Response } from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { and, eq } from "drizzle-orm";
import { productCategoryTable } from "../db/productCategoryTable";
import { productSubCategoryTable } from "../db/productSubCategoryTable";
import { brandTable } from "../db/brandTable";


const db = drizzle(process.env.DATABASE_URL!);

export const productCategoryHandler = async (req: Request, res: Response) => {
  const productCategory = await db.select().from(productCategoryTable);

  const mainAndSubCategories = await Promise.all(
    productCategory.map(async (m) => {
      const subCategories = await db
        .select()
        .from(productSubCategoryTable)
        .where(eq(productSubCategoryTable.ProductCategoryID, m.ID));
      if (m.IsActive)
        return {
          mainCategory: {
            id: m.ID,
            name: m.Name,
            icon: m.Icon,
          },
          subCategories: subCategories
            .filter((s) => s.IsActive)
            .map((s) => ({
              id: s.ID,
              name: s.Name,
              icon: s.Icon,
            })),
        };
    })
  );
  // console.log(mainAndSubCategories);
  res.status(200).json(mainAndSubCategories);
};

// router.get("/:subProductId", productBrand);
export const productBrand = async (req: Request, res: Response) => {
  const { subProductId } = req.params;
  // check mainProductId and subProductId is number
  if (isNaN(Number(subProductId))) {
    res.status(400).json({ message: "Invalid product id" });
    return;

    // select all brand from branTable where ProductID = subProductId
  } else {
    const productBrand = await db
      .select({
        id: brandTable.ID,
        name: brandTable.Name,
        icon: brandTable.Icon,
      })
      .from(brandTable)
      .where(and(
          eq(brandTable.ProductID, Number(subProductId)),
          eq(brandTable.IsActive, true))
      );
    res.status(200).json(productBrand);}
  
}
