import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { vgaTable } from '../vgaTable';
import { cpuTable } from '../cpuTable';
import { ramTable } from '../ramTable';
import { storageTable } from '../storageTable';
import { screenTable } from '../screenTable';

const db = drizzle(process.env.DATABASE_URL!);

async function seedOptions() {
  try {
    console.log('-> Starting hardware options seeding (seed/optionsSeed.ts)...');

    console.log('-> Seeding VGA options...');
    await db.insert(vgaTable).values([
      { ID: 1, Name: 'NVIDIA GeForce RTX 4090', IsActive: true },
      { ID: 2, Name: 'NVIDIA GeForce RTX 3080', IsActive: true },
      { ID: 3, Name: 'AMD Radeon RX 7900 XT', IsActive: true },
      { ID: 4, Name: 'AMD Radeon RX 6700 XT', IsActive: true },
      { ID: 5, Name: 'Intel Arc A770', IsActive: true },
    ]);

    console.log('-> Seeding CPU options...');
    await db.insert(cpuTable).values([
      { ID: 1, Name: 'Intel Core i9-14900K', IsActive: true },
      { ID: 2, Name: 'Intel Core i7-14700K', IsActive: true },
      { ID: 3, Name: 'AMD Ryzen 9 7950X', IsActive: true },
      { ID: 4, Name: 'AMD Ryzen 7 7800X3D', IsActive: true },
      { ID: 5, Name: 'Apple M2 Pro', IsActive: true },
    ]);

    console.log('-> Seeding RAM options...');
    await db.insert(ramTable).values([
      { ID: 1, Name: '8GB DDR4', IsActive: true },
      { ID: 2, Name: '16GB DDR4', IsActive: true },
      { ID: 3, Name: '16GB DDR5', IsActive: true },
      { ID: 4, Name: '32GB DDR5', IsActive: true },
      { ID: 5, Name: '64GB DDR5', IsActive: true },
    ]);

    console.log('-> Seeding Storage options...');
    await db.insert(storageTable).values([
      { ID: 1, Name: '256GB SSD', IsActive: true },
      { ID: 2, Name: '512GB SSD', IsActive: true },
      { ID: 3, Name: '1TB SSD', IsActive: true },
      { ID: 4, Name: '2TB SSD', IsActive: true },
      { ID: 5, Name: '1TB HDD', IsActive: true },
      { ID: 6, Name: '2TB HDD', IsActive: true },
    ]);

    console.log('-> Seeding Screen options...');
    await db.insert(screenTable).values([
      { ID: 1, Name: '13.3"', IsActive: true },
      { ID: 2, Name: '14"', IsActive: true },
      { ID: 3, Name: '15.6"', IsActive: true },
      { ID: 4, Name: '16"', IsActive: true },
      { ID: 5, Name: '17.3"', IsActive: true },
      { ID: 6, Name: '24"', IsActive: true },
      { ID: 7, Name: '27"', IsActive: true },
    ]);

    console.log('-> Hardware options seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('-> Error seeding hardware options (seed/optionsSeed.ts):', error);
    process.exit(1);
  }
}

seedOptions();