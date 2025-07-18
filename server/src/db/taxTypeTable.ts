import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";
export const taxTypeTable = mysqlTable("TaxType", {
  ID: int().primaryKey().autoincrement(),
  Name: varchar({length : 50}).notNull(),
})