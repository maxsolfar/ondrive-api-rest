import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validationAuth } from "../middlewares/validationAuth.js";
const { body } = require("express-validator");
const authRouter = Router();

authRouter.post(
  "/login", 
  [
    body("email")
      .trim()
      .not()
      .isEmpty().withMessage("Email is empty")
      .isEmail().withMessage("Incorrect email format")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({min: 6}).withMessage("At least 8 characters are required")
  ],
  validationAuth,
  login
);

authRouter.post(
  "/register",
  [
    body("email")
      .trim()
      .not()
      .isEmpty().withMessage("Email is empty")
      .isEmail().withMessage("Incorrect email format")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({min: 6}).withMessage("At least 8 characters are required")
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
      .matches(/^[A-Za-z\s]+$/).withMessage("Last Name must be only letters")
  ],
  validationAuth,
  register
);

export default authRouter;
