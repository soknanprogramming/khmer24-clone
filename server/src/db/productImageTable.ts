import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { productTable } from "./productTable";

export const productImageTable = mysqlTable("ProductImage", {
  ID: int().primaryKey().autoincrement(),
  Photo: varchar({length : 50}).notNull(),
  SortOrder: int().notNull(),
  ProductID: int().references(() => productTable.ID).notNull(),
})