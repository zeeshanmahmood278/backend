export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  const error = {
    message: errorMessage,
  };

  if (err.hasOwnProperty("details")) {
    error.details = err?.details;
  }
  res.status(statusCode).json(error);
};
