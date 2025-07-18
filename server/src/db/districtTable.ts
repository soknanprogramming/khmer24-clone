import { mysqlTable, int, varchar, boolean } from 'drizzle-orm/mysql-core';
import { cityTable } from './cityTable';

export const districtTable = mysqlTable('District', {
    ID: int().primaryKey(),
    Name: varchar({ length: 100 }).notNull(),
    CityID: int().references(() => cityTable.ID).notNull(),
    isActive: boolean().notNull().default(true),
});
