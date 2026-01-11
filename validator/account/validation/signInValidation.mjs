import { body } from "express-validator";

const signInValidation = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("password").exists().withMessage("Password is required."),
];

export default signInValidation;
