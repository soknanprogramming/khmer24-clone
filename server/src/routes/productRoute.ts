import { Router } from "express";
import { createProduct, getUserProducts, getAllProducts, getProductById } from "../handlers/productHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  productValidationRules,
  validate,
} from "../middleware/productValidation";
import { upload } from "../middleware/multerConfig";

const router = Router();

router.get("/public", getAllProducts as any); 
router.get("/public/:id", getProductById as any); // <-- Add this new route

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