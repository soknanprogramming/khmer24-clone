import { Router } from "express";
import { createProduct } from "../handlers/productHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  productValidationRules,
  validate,
} from "../middleware/productValidation";
import { upload } from "../middleware/multerConfig";

const router = Router();

router.post(
  "/",
  ensureAuthenticated,
  upload,
  productValidationRules,
  validate,
  createProduct
);

export default router;