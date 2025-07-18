import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";

export const productCategoryTable = mysqlTable("ProductCategory", {
  ID: int().primaryKey().autoincrement(),
  Name: varchar({length : 50}).notNull(),
  Icon: varchar({length : 250}).notNull(),
  IsActive: boolean().notNull(),
});