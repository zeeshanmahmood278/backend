import { param, validationResult } from "express-validator";
import mongoose from "mongoose";
import customError from "../utils/customError.mjs";

const idValidator = [
  param("id")
    .notEmpty()
    .trim()
    .withMessage("Id is required")
    .bail()
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new customError(`The provided Id ${value} is invalid.`, 400);
      }
    }),
  (req, res, next) => {
    
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const { msg } =
        validationErrors.array()[0]; /* GETTING FIRST INDEX ARRAY */
      console.log(msg);
      return next(new customError(msg, 400));
    }
    next();
  },
];

export default idValidator;