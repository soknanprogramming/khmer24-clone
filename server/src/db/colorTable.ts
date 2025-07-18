import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";
export const colorTable = mysqlTable("Color", {
  ID: int().primaryKey().autoincrement(),
  Name: varchar({length : 50}).notNull(),
})