// External Dependancies
const mongoose = require("mongoose");
const createError = require("http-errors");
const MongooseHelper = require("../plugins/MongooseHelper");

// Get Data Models
const User = require("../models/User");

const userService = require("../services/user");

// Get all users
exports.getUsers = async (req, reply) => {
  reply.send(await userService.getAllUsers());
};

// Get single user by ID
exports.getSingleUser = async (req, reply) => {
  const userID = req.params.id;
  reply.send(await userService.getUserById(userID));
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
