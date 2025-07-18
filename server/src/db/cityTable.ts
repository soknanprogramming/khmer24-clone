import { mysqlTable, int, varchar, boolean } from 'drizzle-orm/mysql-core';

export const cityTable = mysqlTable('City', {
    ID: int().primaryKey(),
    Name: varchar({ length: 100 }).notNull(),
    isActive: boolean().notNull().default(true),
});
