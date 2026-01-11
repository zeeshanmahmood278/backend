import { body, validationResult, param } from "express-validator";
import customError from "../../utils/customError.mjs";
import accountModel from "../../models/accountModel.mjs";
import mongoose from "mongoose";
const likeValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid post ID."),
  body("userId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid user ID.")
    .bail()
    .custom(async (value) => {
      const isUserExist = await accountModel.findByFieldName({ _id: value });
      if (isUserExist?.length == 0) {
        throw new customError("USER NOT FOUND.", "404");
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
export default likeValidator;