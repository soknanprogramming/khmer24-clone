import { Request, Response } from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { MySqlTableFn, boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

const createTable = (tableName: string) => mysqlTable(tableName, {
    ID: int('ID').primaryKey().autoincrement(),
    Name: varchar('Name', {length : 100}).notNull(),
    IsActive: boolean('IsActive').notNull(),
});

export const componentHandler = (tableName: string) => async (req: Request, res: Response) => {
  const table = createTable(tableName);
  const components = await db
    .select({
        ID: table.ID,
        Name: table.Name,
    })
    .from(table)
    .where(eq(table.IsActive, true));
  res.status(200).json(components);
};