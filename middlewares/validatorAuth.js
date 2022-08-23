import { validationResult } from "express-validator";
import { body, param } from "express-validator";

export const validationAuth = (req, res, next) => { 
  const errorFormatter = ({ msg, param }) => {
    return {[param]: msg};
  };
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/* Project Routes Validations */
export const paramIdValidator = [
  param("idProject", "Incorrect ID format")
    .trim()
    .notEmpty()
    .escape(),
  validationAuth
];

export const bodyProjectValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is empty"),
  body("description")
    .trim()
    .notEmpty().withMessage("Description is empty"),
  validationAuth
];

// Task Routes Validations */
export const bodyTaskValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is empty"),
  body("description")
    .trim()
    .notEmpty().withMessage("Description is empty"),
  body("priority")
    .trim()
    .notEmpty().withMessage("Priority is empty"),
  body("expiryDate")
    .isDate().withMessage("Expiry date must be a date format"),
  validationAuth
];

/* Auth Routes Validations */
export const loginValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is empty")
    .isEmail().withMessage("Incorrect email format")
    .normalizeEmail(),
  validationAuth
];

export const registerValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is empty")
    .isEmail().withMessage("Incorrect email format")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({min: 8}).withMessage("At least 8 characters are required")
    .custom((value,{req}) => {
      if(value !== req.body.confirmPassword){
        throw new Error("Password confirmation does not match password");
      }
      return value;
    }),
  body("name")
    .trim()
    .notEmpty()
    .matches(/^[A-Za-z\s]+$/).withMessage("Name must be only letters"),
  body("lastName")
    .trim()
    .notEmpty()
    .matches(/^[A-Za-z\s]+$/).withMessage("Last Name must be only letters"),
  validationAuth
];