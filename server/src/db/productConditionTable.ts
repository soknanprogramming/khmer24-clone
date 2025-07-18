import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";
export const productConditionTable = mysqlTable("ProductCondition", {
  ID: int().primaryKey().autoincrement(),
  Name: varchar({length : 50}).notNull(),
  IsActive: boolean().notNull(),
})