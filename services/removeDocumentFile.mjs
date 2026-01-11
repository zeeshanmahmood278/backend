import fs from "fs";
import customError from "../utils/customError.mjs";

export default async (documentPath) => {
  try {
    fs.unlink(documentPath, (err) => {
      if (err)
        throw new customError(
          `Unable To Delete Local Document File ${err.message}`,
          500
        );

      console.log("File Has been Delete");
    });
  } catch (err) {
    throw new customError(err.message, 500);
  }
};
