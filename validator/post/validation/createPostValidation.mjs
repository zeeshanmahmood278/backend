import { validationResult } from "express-validator";
import customError from "../../../utils/customError.mjs";
import postValidationHelper from "../helper/postValidationHelper.mjs";

const createPostValidation = [
  ...postValidationHelper,

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

export default createPostValidation;
