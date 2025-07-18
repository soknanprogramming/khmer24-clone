import { Router } from "express";
import { productCategoryHandler, productBrand } from "../handlers/productCategoryHandler";

const router = Router();

router.get("/", productCategoryHandler);
router.get("/:subProductId", productBrand);

export default router;