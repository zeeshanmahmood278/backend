import { body, validationResult } from "express-validator";

const emailValidationHelper = [
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please enter your email.")
    .bail()
    .isEmail()
    .withMessage(
      "The email address appears to be invalid. Please check the format and try again"
    ),
];

export default emailValidationHelper;
