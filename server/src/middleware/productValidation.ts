import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const productValidationRules = [
  body("name").notEmpty().isString().withMessage("Name is required."),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be a positive number."),
  body("description").notEmpty().isString().withMessage("Description is required."),
  body("cityId").isInt().withMessage("A valid City ID is required."),
  body("districtId").isInt().withMessage("A valid District ID is required."),
  body("communeId").isInt().withMessage("A valid Commune ID is required."),
  body("address").notEmpty().isString().withMessage("Address is required."),
  // Add any other validation rules you need here
];

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ errors: errors.array() });
};