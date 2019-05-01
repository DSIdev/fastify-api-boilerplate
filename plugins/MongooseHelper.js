const createError = require("http-errors");

exports.parseError = error => {
  if (error.name === "ValidationError") {
    return new createError.BadRequest(error.message);
  } else if (error.name === "MongoError" && error.code === 11000) {
    return new createError.Forbidden(
      "Duplicate entry on unique indexed field."
    );
  }
  return error;
};
