import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { cityTable } from '../cityTable';
import { districtTable } from '../districtTable';
import { communeTable } from '../communeTable';

const db = drizzle(process.env.DATABASE_URL!);

async function seedLocations() {
  try {
    console.log('-> Starting fake location seeding (speed/locationSeep.ts)...');

    console.log('-> Seeding cities...');
    await db.insert(cityTable).values([
      { ID: 1, Name: 'Phnom Penh', isActive: true },
      { ID: 2, Name: 'Siem Reap', isActive: true },
      { ID: 3, Name: 'Battambang', isActive: true },
      { ID: 4, Name: 'Kampong Cham', isActive: true },
      { ID: 5, Name: 'Sihanoukville', isActive: true },
    ]);

    console.log('-> Seeding districts...');
    await db.insert(districtTable).values([
      { ID: 1, Name: 'Chamkarmon', CityID: 1, isActive: true },
      { ID: 2, Name: 'Daun Penh', CityID: 1, isActive: true },
      { ID: 3, Name: 'Toul Kork', CityID: 1, isActive: true },
      { ID: 4, Name: 'Mean Chey', CityID: 1, isActive: true },
      { ID: 5, Name: 'Sala Kamreuk', CityID: 2, isActive: true },
      { ID: 6, Name: 'Svay Dangkum', CityID: 2, isActive: true },
      { ID: 7, Name: 'Wat Bo', CityID: 2, isActive: true },
      { ID: 8, Name: 'Samraong', CityID: 3, isActive: true },
      { ID: 9, Name: 'Sampov Loun', CityID: 3, isActive: true },
      { ID: 10, Name: 'Tuek Phos', CityID: 3, isActive: true },
      { ID: 11, Name: 'Kampong Cham Town', CityID: 4, isActive: true },
      { ID: 12, Name: 'Ponhea Kraek', CityID: 4, isActive: true },
      { ID: 13, Name: 'Kampong Siem', CityID: 4, isActive: true },
      { ID: 14, Name: 'Preah Sihanouk', CityID: 5, isActive: true },
      { ID: 15, Name: 'Kampong Seila', CityID: 5, isActive: true },
      { ID: 16, Name: 'Koh Rong', CityID: 5, isActive: true },
    ]);

    console.log('-> Seeding communes...');
    await db.insert(communeTable).values([
      { ID: 1, Name: 'Boeung Keng Kang I', DistrictID: 1, isActive: true },
      { ID: 2, Name: 'Toul Tumpong', DistrictID: 1, isActive: true },
      { ID: 3, Name: 'Srah Chak', DistrictID: 2, isActive: true },
      { ID: 4, Name: 'Tumnup Teuk', DistrictID: 2, isActive: true },
      { ID: 5, Name: 'Teuk Thla', DistrictID: 1, isActive: true },
      { ID: 6, Name: 'Russei Keo', DistrictID: 2, isActive: true },
      { ID: 7, Name: 'Kouk Chak', DistrictID: 3, isActive: true },
      { ID: 8, Name: 'Chaktomuk', DistrictID: 2, isActive: true },
      { ID: 9, Name: 'Boeng Keng Kang III', DistrictID: 1, isActive: true },
      { ID: 10, Name: 'Preak Phnov', DistrictID: 4, isActive: true },
      { ID: 11, Name: 'Svay Dangkum', DistrictID: 6, isActive: true },
      { ID: 12, Name: 'Preah Ang Thom', DistrictID: 6, isActive: true },
      { ID: 13, Name: 'Saintong', DistrictID: 5, isActive: true },
      { ID: 14, Name: 'Kouk Khleang', DistrictID: 5, isActive: true },
      { ID: 15, Name: 'Roka Krau', DistrictID: 7, isActive: true },
      { ID: 16, Name: 'Sala Kralor', DistrictID: 8, isActive: true },
      { ID: 17, Name: 'Poy Tumpuong', DistrictID: 8, isActive: true },
      { ID: 18, Name: 'Moat Phluk', DistrictID: 9, isActive: true },
      { ID: 19, Name: 'Traeng', DistrictID: 9, isActive: true },
      { ID: 20, Name: 'Tuek Phos', DistrictID: 10, isActive: true },
      { ID: 21, Name: 'Sangkhoar', DistrictID: 11, isActive: true },
      { ID: 22, Name: 'Batheay', DistrictID: 11, isActive: true },
      { ID: 23, Name: 'Angk Snuol', DistrictID: 12, isActive: true },
      { ID: 24, Name: 'Prek Prasab', DistrictID: 13, isActive: true },
      { ID: 25, Name: 'Preah Sihanouk', DistrictID: 14, isActive: true },
      { ID: 26, Name: "O'Chheuteal", DistrictID: 14, isActive: true },
      { ID: 27, Name: 'Sre Ambel', DistrictID: 15, isActive: true },
      { ID: 28, Name: 'Koh Rong', DistrictID: 16, isActive: true },
      { ID: 29, Name: 'Koh Rong Sanloem', DistrictID: 16, isActive: true },
      { ID: 30, Name: 'Kanseng', DistrictID: 14, isActive: true },
    ]);

    console.log('-> Fake location seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('-> Error seeding fake locations (speed/locationSeep.ts):', error);
    process.exit(1);
  }
}

seedLocations();