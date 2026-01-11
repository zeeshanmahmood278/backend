import { body } from "express-validator";

const usernameValidationHelper = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please enter the username.")
    .bail()
    .isAlphanumeric()
    .withMessage(
      "The username appears to be invalid. Please check the format and try again"
    ),
];

export default usernameValidationHelper;