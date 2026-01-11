import { body, validationResult, param } from "express-validator";
import customError from "../../utils/customError.mjs";
import mongoose from "mongoose";
const commentValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid post ID."),
  body("userId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid user ID."),
  body("comment")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please enter a comment before submitting")
    .bail(),

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

export default commentValidator;
