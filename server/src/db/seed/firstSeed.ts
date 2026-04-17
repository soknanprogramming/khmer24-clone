import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { productCategoryTable } from "../productCategoryTable";
import { productSubCategoryTable } from "../productSubCategoryTable";
import { brandTable } from "../brandTable";
import { productRequirementsTable } from "../productRequirementsTable";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  try {
    console.log("-> Starting database seeding...");

    // Seed ProductCategory
    console.log("-> Seeding ProductCategory...");
    const existingCategories = await db.select().from(productCategoryTable);
    if (existingCategories.length > 0) {
      console.log("-> ProductCategory already seeded, skipping...");
    } else {
      await db.insert(productCategoryTable).values({
        ID: 1,
        Name: "Computers & Accessories",
        Icon: "s-computer-and-accessories-1638848160.webp",
        IsActive: true,
      });
      console.log("-> ProductCategory seeded");
    }

    // Seed ProductSubCategory
    console.log("-> Seeding ProductSubCategory...");
    const existingSubCategories = await db
      .select()
      .from(productSubCategoryTable);
    if (existingSubCategories.length > 0) {
      console.log("-> ProductSubCategory already seeded, skipping...");
    } else {
      await db.insert(productSubCategoryTable).values([
        {
          ID: 1,
          Name: "Laptops",
          Icon: "s-laptops-1638864565.webp",
          ProductCategoryID: 1,
          IsActive: true,
        },
        {
          ID: 2,
          Name: "Desktops",
          Icon: "s-desktops-1638927496.webp",
          ProductCategoryID: 1,
          IsActive: true,
        },
        {
          ID: 3,
          Name: "All-In-One",
          Icon: "s-all-in-one-pc-1638927503.webp",
          ProductCategoryID: 1,
          IsActive: true,
        },
        {
          ID: 4,
          Name: "Monitors",
          Icon: "s-monitors-1638927508.webp",
          ProductCategoryID: 1,
          IsActive: true,
        },
        {
          ID: 5,
          Name: "Printers & Scanners",
          Icon: "s-printers-and-scanners-1638927513.webp",
          ProductCategoryID: 1,
          IsActive: true,
        },
        {
          ID: 6,
          Name: "Parts & Accessories",
          Icon: "s-computer-parts-and-accessories-1638927519.webp",
          ProductCategoryID: 1,
          IsActive: true,
        },
        {
          ID: 7,
          Name: "Softwares",
          Icon: "s-softwares-1638927558.webp",
          ProductCategoryID: 1,
          IsActive: true,
        },
      ]);
      console.log("-> ProductSubCategory seeded");
    }
    // Seed Brand
    console.log("-> Seeding Brand...");
    const existingBrands = await db.select().from(brandTable);
    if (existingBrands.length > 0) {
      console.log("-> Brand already seeded, skipping...");
    } else {
      await db.insert(brandTable).values([
        {
          ID: 1,
          Name: "Acer",
          Icon: "s-acer-1634629929.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 2,
          Name: "Apple",
          Icon: "s-apple-1634630145.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 3,
          Name: "Asus",
          Icon: "s-asus-1634629941.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 4,
          Name: "Dell",
          Icon: "s-dell-1634630151.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 5,
          Name: "Epson",
          Icon: "s-epson-1634631988.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 6,
          Name: "Fukitsu",
          Icon: "s-fujitsu-1634630447.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 7,
          Name: "Gateway",
          Icon: "s-gateway-1634630454.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 8,
          Name: "Hp",
          Icon: "s-hp-1634630460.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 9,
          Name: "Lenovo",
          Icon: "s-lenovo-1634630767.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 10,
          Name: "Microsoft",
          Icon: "s-microsoft-1634631888.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 11,
          Name: "MSI",
          Icon: "s-msi-1634631286.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 12,
          Name: "Panasonic",
          Icon: "s-panasonic-1634631280.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 13,
          Name: "Samsung",
          Icon: "s-samsung-1634631291.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 14,
          Name: "Sony",
          Icon: "s-sony-1634631501.png",
          ProductID: 1,
          IsActive: true,
        },
        {
          ID: 15,
          Name: "Toshiba",
          Icon: "s-toshiba-1634631711.png",
          ProductID: 1,
          IsActive: true,
        },
      ]);
      console.log("-> Brand seeded");
    }

    // Seed ProductRequirements
    console.log("-> Seeding ProductRequirements...");
    const existingRequirements = await db
      .select()
      .from(productRequirementsTable);
    if (existingRequirements.length > 0) {
      console.log("-> ProductRequirements already seeded, skipping...");
    } else {
      await db.insert(productRequirementsTable).values({
        ID: 1,
        productSubCategoryID: 1,
        ProductName: true,
        ProductBrand: true,
        TaxType: true,
        Condition: true,
        Color: true,
        Transmission: true,
        EngineType: true,
        BodyType: true,
        Vga: true,
        Cpu: true,
        Ram: true,
        Storage: true,
        Screen: true,
        Price: true,
        Discount: true,
        IsFreeDelivery: true,
        Description: true,
        City: true,
        District: true,
        Commune: true,
        Address: true,
        Latitude: true,
        Longitude: true,
        CreatedDate: true,
        IsActive: true,
        ProductDetail: true,
      });
      console.log("-> ProductRequirements seeded");
    }

    console.log("-> Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("-> Error seeding database:", error);
    process.exit(1);
  }
}

seed();
