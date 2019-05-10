const mongoose = require("mongoose");
const createError = require("http-errors");
const MongooseHelper = require("../plugins/MongooseHelper");

// Get Data Models
const User = require("../models/User");

exports.getAllUsers = async () => {
  const resultLimit = 2;
  let time = Date.now();
  try {
    const users = await User.find().limit(resultLimit);
    return [
      {
        queryTime: Date.now() - time,
        message: `Limiting to ${resultLimit} entries`
      },
      ...users
    ];
  } catch (err) {
    return new createError(err);
  }
};

exports.getUserById = async userID => {
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return new createError.BadRequest("Invalid ID");
  }
  try {
    const user = await User.findById(userID);
    if (!user) return new createError.NotFound("Unknown ID");
    return user;
  } catch (err) {
    return new createError(err);
  }
};
