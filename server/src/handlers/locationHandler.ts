import { Request, Response } from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { cityTable } from "../db/cityTable";
import { districtTable } from "../db/districtTable";
import { communeTable } from "../db/communeTable";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

export const locationHandler = async (req: Request, res: Response) => {
  const cities = await db.select().from(cityTable).where(eq(cityTable.isActive, true));
  const districts = await db.select().from(districtTable).where(eq(districtTable.isActive, true));
  const communes = await db.select().from(communeTable).where(eq(communeTable.isActive, true));

  const locationData = cities.map(city => ({
    id: city.ID,
    name: city.Name,
    districts: districts
      .filter(district => district.CityID === city.ID)
      .map(district => ({
        id: district.ID,
        name: district.Name,
        communes: communes
          .filter(commune => commune.DistrictID === district.ID)
          .map(commune => ({
            id: commune.ID,
            name: commune.Name,
          })),
      })),
  }));

  res.status(200).json(locationData);
};