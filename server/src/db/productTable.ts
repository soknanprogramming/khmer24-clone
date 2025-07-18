import { mysqlTable, int, varchar, decimal, boolean, datetime } from "drizzle-orm/mysql-core";

import { productSubCategoryTable } from "./productSubCategoryTable";
import { brandTable } from "./brandTable";
import { taxTypeTable } from "./taxTypeTable";
import { productConditionTable } from "./productConditionTable";
import { colorTable } from "./colorTable";
import { transmissionTable } from "./transmissionTable";
import { engineTypeTable } from "./engineTypeTable";
import { bodyTypeTable } from "./bodyTypeTable";
import { vgaTable } from "./vgaTable";
import { cpuTable } from "./cpuTable";
import { ramTable } from "./ramTable";
import { storageTable } from "./storageTable";
import { screenTable } from "./screenTable";

import { cityTable } from "./cityTable";
import { districtTable } from "./districtTable";
import { communeTable } from "./communeTable";
import { productDetailsTable } from "./productDetailTable";
  
  export const productTable = mysqlTable("Product", {
    ID: int().primaryKey().autoincrement(),
    Name: varchar({ length: 100 }).notNull(),
    ProductSubCategoryID: int().references(() => productSubCategoryTable.ID),
    ProductBrandID: int().references(() => brandTable.ID),
    TaxTypeID: int().references(() => taxTypeTable.ID),
    ConditionID: int().references(() => productConditionTable.ID),
    ColorID: int().references(() => colorTable.ID),
    TransmissionID: int().references(() => transmissionTable.ID),
    EngineTypeID: int().references(() => engineTypeTable.ID),
    BodyTypeID: int().references(() => bodyTypeTable.ID),
    VgaID: int().references(() => vgaTable.ID),
    CpuID: int().references(() => cpuTable.ID),
    RamID: int().references(() => ramTable.ID),
    StorageID: int().references(() => storageTable.ID),
    ScreenID: int().references(() => screenTable.ID),
  
    Price: decimal({ precision: 19, scale: 4 }).notNull(), 
    Discount: decimal({ precision: 8, scale: 2 }),
    DiscountAsPercentage: boolean().notNull(),
    IsFreeDelivery: boolean().notNull(), 
  
    Description: varchar({ length: 255 }).notNull(),
  
    CityID: int().references(() => cityTable.ID).notNull(),
    DistrictID: int().references(() => districtTable.ID).notNull(),
    CommuneID: int().references(() => communeTable.ID).notNull(),
    Address: varchar({ length: 255 }).notNull(),
  
    Latitude: decimal({ precision: 10, scale: 6 }),
    Longitude: decimal({ precision: 10, scale: 6 }),
    CreatedDate: datetime().notNull(),
    IsActive: boolean().notNull(),

    ProductDetailID : int().references(() => productDetailsTable.ID),

    
    
  });
  