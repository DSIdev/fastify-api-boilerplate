// External Dependancies
const mongoose = require("mongoose");
const createError = require("http-errors");
const MongooseHelper = require("../plugins/MongooseHelper");

// Get Data Models
const User = require("../models/User");

// Get all users
exports.getUsers = async (req, reply) => {
  try {
    const resultLimit = 2;
    let time = Date.now();
    const users = await User.find().limit(resultLimit);
    return [
      {
        queryTime: Date.now() - time,
        message: `Limiting to ${resultLimit} entries`
      },
      ...users
    ];
  } catch (err) {
    return reply.send(new createError(err));
  }
};

// Get single user by ID
exports.getSingleUser = async (req, reply) => {
  const userID = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return reply.send(new createError.BadRequest("Invalid ID"));
  }
  try {
    const user = await User.findById(userID);
    if (!user) return reply.send(new createError.NotFound("Unknown ID"));
    return reply.send(user);
  } catch (err) {
    return reply.send(new createError(err));
  }
};

// Add a new user
exports.addUser = async (req, reply) => {
  try {
    const user = await new User(req.body).save();
    return user._id;
  } catch (err) {
    const error = MongooseHelper.parseError(err);
    return reply.send(new createError(error));
  }
};

// Update an existing user
exports.updateUser = async (req, reply) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const { ...updateData } = user;
    const update = await User.findByIdAndUpdate(id, updateData, { new: true });
    return update;
  } catch (err) {
    return reply.send(new createError(err));
  }
};

// Delete a user
exports.deleteUser = async (req, reply) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    return user;
  } catch (err) {
    return reply.send(new createError(err));
  }
};
