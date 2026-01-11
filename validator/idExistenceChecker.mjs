import { param, validationResult } from "express-validator";
import customError from "../utils/customError.mjs";

const idExistenceChecker = (MODEL) => [
  param("id").custom(async (value) => {
    const document = await MODEL._findById(value);
    if (!document) {
      throw new customError(`No record found with Id ${value}.`, 404);
    }
  }),
  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const { msg } =
        validationErrors.array()[0]; /* GETTING FIRST INDEX ARRAY */

      return next(new customError(msg, 404));
    }
    next();
  },
];
export default idExistenceChecker;