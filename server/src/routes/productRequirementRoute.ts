import { Router } from "express";
import { productRequirementHandler } from "../handlers/productRequirementHandler";

const router = Router();

router.get("/:subCategoryID", productRequirementHandler);

export default router;