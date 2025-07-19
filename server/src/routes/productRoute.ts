import { Router } from "express";
import { createProduct, getUserProducts, getAllProducts, getProductById, deleteProduct } from "../handlers/productHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  productValidationRules,
  validate,
} from "../middleware/productValidation";
import { upload } from "../middleware/multerConfig";

const router = Router();

router.get("/public", getAllProducts as any);
router.get("/public/:id", getProductById as any);

router.get("/mine", ensureAuthenticated, getUserProducts as any);

router.post(
  "/",
  ensureAuthenticated,
  upload,
  productValidationRules,
  validate,
  createProduct
);

router.delete("/:id", ensureAuthenticated, deleteProduct as any); // Added delete route

export default router;