import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";
import { productSubCategoryTable } from "./productSubCategoryTable";

export const brandTable = mysqlTable("Brand", {
  ID: int().primaryKey().autoincrement(),
  Name: varchar({length : 50}).notNull(),
  Icon: varchar({length : 50}).notNull(),
  ProductID: int().references(() => productSubCategoryTable.ID).notNull(),
  IsActive: boolean().notNull(),
})