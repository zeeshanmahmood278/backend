class customError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;

    if (details != null) {
      this.details = details;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

export default customError;