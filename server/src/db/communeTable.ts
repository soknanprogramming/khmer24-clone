import { mysqlTable, int, varchar, boolean } from 'drizzle-orm/mysql-core';
import { districtTable } from './districtTable';

export const communeTable = mysqlTable('Commune', {
    ID: int().primaryKey(),
    Name: varchar({ length: 100 }).notNull(),
    DistrictID: int().references(() => districtTable.ID).notNull(),
    isActive: boolean().notNull().default(true),
});
