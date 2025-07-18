import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const engineTypeTable = mysqlTable('EngineType', {
  ID: int().primaryKey(),
  Name: varchar({ length: 50 }).notNull(),
});
