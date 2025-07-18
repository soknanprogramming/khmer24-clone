import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const genderTable = mysqlTable('Gender', {
  ID: int().primaryKey(),
  Name: varchar({ length: 50 }).notNull(),
});
