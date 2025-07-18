import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const bodyTypeTable = mysqlTable('BodyType', {
  ID: int().primaryKey(),
  Name: varchar({ length: 50 }).notNull(),
});
