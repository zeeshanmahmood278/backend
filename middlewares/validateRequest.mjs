import { validationResult } from "express-validator";
import customError from "../utils/customError.mjs";

const validateRequest = (req, res, next) => {
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
  } else {
    next();
  }
};

export default validateRequest;
