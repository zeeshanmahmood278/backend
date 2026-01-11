import { body, validationResult } from "express-validator";
import emailValidationHelper from "../helper/emailValidationHelper.mjs";
import usernameValidationHelper from "../helper/usernameValidationHelper.mjs";
import passwordValidationHelper from "../helper/passwordValidationHelper.mjs";
import customError from "../../../utils/customError.mjs";

import ACCOUNT from "../../../models/accountModel.mjs";
import ROLE from "../../../models/roleModel.mjs";

const createAccountValidation = [
  body("accountType")
    .trim()
    .escape()
    .custom(async (value) => {
      const isRoleExist = await ROLE.findByFieldName({ name: value });
      if (isRoleExist?.length == 0) {
        throw new customError(`The selected role ${value} is not recognized`);
      }
    }),
  ...usernameValidationHelper,
  body("username").custom(async (value) => {
    const isUsernameExist = await ACCOUNT.findByFieldName({
      username: value,
    });
    if (isUsernameExist?.length > 0) {
      throw new customError(
        `We're sorry, but the username you entered is already in use. Please try a different one`
      );
    }
  }),
  ...passwordValidationHelper,
  ...emailValidationHelper,
  body("email").custom(async (value) => {
    const isEmailExist = await ACCOUNT.findByFieldName({
      email: value,
    });
    if (isEmailExist?.length > 0) {
      throw new customError(
        `We're sorry, but the email you entered is already in use. Please try a different one`
      );
    }
  }),

  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const formatErrors = validationErrors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      }));

      const detail = {
        errors: formatErrors,
      };
      next(new customError("Validation Errors", 400, detail));
    }

    next();
  },
];

export default createAccountValidation;
