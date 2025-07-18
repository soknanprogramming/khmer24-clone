import { Router } from "express";
import { createProduct, getUserProducts, getAllProducts } from "../handlers/productHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  productValidationRules,
  validate,
} from "../middleware/productValidation";
import { upload } from "../middleware/multerConfig";

const router = Router();

router.get("/public", getAllProducts as any); // <-- New public route for all ads

router.get("/mine", ensureAuthenticated, getUserProducts as any);

router.post(
  "/",
  ensureAuthenticated,
  upload,
  productValidationRules,
  validate,
  createProduct
);

export default router;