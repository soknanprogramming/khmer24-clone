import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";
import { brandTable } from "./brandTable";

export const modelTable = mysqlTable("Model", {
  ID: int().primaryKey().autoincrement(),
  Name: varchar({length : 50}).notNull(),
  BrandID: int().references(() => brandTable.ID).notNull(),
  IsActive: boolean().notNull(),
})