import { validationResult } from "express-validator";
import { body } from "express-validator";

export const validationAuth = (req, res, next) => { 
  const errorFormatter = ({ msg, param }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!c
    return {[param]: msg};
  };
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const loginValidator = [
  body("email")
    .trim()
    .not()
    .isEmpty().withMessage("Email is empty")
    .isEmail().withMessage("Incorrect email format")
    .normalizeEmail(),
  validationAuth
];

export const registerValidator = [
  body("email")
    .trim()
    .not()
    .isEmpty().withMessage("Email is empty")
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
    .not()
    .isEmpty()
    .matches(/^[A-Za-z\s]+$/).withMessage("Name must be only letters"),
  body("lastName")
    .trim()
    .not()
    .isEmpty()
    .matches(/^[A-Za-z\s]+$/).withMessage("Last Name must be only letters"),
  validationAuth
];