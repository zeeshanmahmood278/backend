import bcrypt from "bcrypt";
import customError from "../utils/customError.mjs";
export const bcryptPasswordHashingService = async (password) => {
  const salt = 10;
  try {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new customError(
      "We encountered an error while securing your password. Please try again later"
    );
  }
};

export const bcryptPasswordComparingService = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new customError(
      "Password authentication failed. Please ensure you've entered the correct password.",
      400
    );
  }
};