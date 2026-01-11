import jwt from "jsonwebtoken";
import customError from "../utils/customError.mjs";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) {
    return next(new customError("Authentication required.", 401));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "default_secret_key", (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
         return next(new customError("Session expired. Please sign in again.", 403));
      }
      return next(new customError("Invalid authentication token.", 403));
    }
    req.user = user;
    next();
  });
};

export default authMiddleware;
