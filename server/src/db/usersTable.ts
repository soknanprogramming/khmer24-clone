import { mysqlTable, int, decimal, varchar, datetime, boolean } from 'drizzle-orm/mysql-core';
import { genderTable } from './genderTable';
import { cityTable } from './cityTable';
import { districtTable } from './districtTable';
import { communeTable } from './communeTable';
import { InferModel } from 'drizzle-orm';

export const usersTable = mysqlTable('User', {
  ID: int().primaryKey().autoincrement(),
  FirstName: varchar({ length: 50 }).notNull(),
  LastName: varchar({ length: 50 }).notNull(),
  GenderID: int().references(() => genderTable.ID),
  Birthday: datetime(),
  Company: varchar({ length: 100 }),
  PhoneNumber: varchar({ length: 10 }).unique().notNull(),
  PhoneNumber2: varchar({ length: 10 }),
  PhoneNumber3: varchar({ length: 10 }),
  Address: varchar({ length: 255 }),
  ProvinceID: int().references(() => cityTable.ID),
  DistrictID: int().references(() => districtTable.ID),
  CommuneID: int().references(() => communeTable.ID),
  Latitude: decimal({ precision: 11, scale: 8 }),
  Longitude: decimal({ precision: 11, scale: 8 }),
  FacebookAuth: varchar({ length: 255}),
  GoogleAuth: varchar({ length: 255 }),
  UserName: varchar({ length: 50 }).unique().notNull(),
  Password: varchar({ length: 500 }).notNull(),
  Email: varchar({ length: 150 }).unique(),
  isActive: boolean().notNull().default(true),
});


export type User = InferModel<typeof usersTable>;
