import { body } from "express-validator";
import ACCOUNT from "../../../models/accountModel.mjs";

const forgetPasswordEmail = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .bail()
    .custom(async (value) => {
        const user = await ACCOUNT.findOne({ email: value });
        if (!user) {
            return Promise.reject("Email does not exist.");
        }
    }),
];

const forgetPasswordPassword = [
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please enter your new password.")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s])[A-Za-z\d\S]{8,}$/)
    .withMessage(
      "Your password is weak. Use at least 8 characters, including uppercase and lowercase letters, numbers, and special symbols."
    ),
];

export { forgetPasswordEmail, forgetPasswordPassword };
