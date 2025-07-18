import { int, mysqlTable, varchar, boolean } from 'drizzle-orm/mysql-core';

export const cpuTable = mysqlTable('Cpu', {
  ID: int().primaryKey(),
  Name: varchar({ length: 100 }).notNull(),
  IsActive: boolean().notNull(),
});
