import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";
import { productCategoryTable } from "./productCategoryTable";

export const productSubCategoryTable = mysqlTable("ProductSubCategory", {
  ID: int().primaryKey().autoincrement(),
  Name: varchar({length : 50}).notNull(),
  Icon: varchar({length : 250}).notNull(),
  ProductCategoryID: int().references(() => productCategoryTable.ID).notNull(),
  IsActive: boolean().notNull(),
});