import { mysqlTable, int, varchar} from "drizzle-orm/mysql-core";

export const productDetailsTable = mysqlTable("product_details", {
  ID: int().autoincrement().primaryKey(),
  Username: varchar({ length: 255 }).notNull(),
  PhoneNumber: varchar({ length: 255 }).notNull(),
  PhoneNumber2: varchar({ length: 255 }),
  PhoneNumber3: varchar({ length: 255 }),
  Email: varchar({ length: 255 }).notNull(),
})