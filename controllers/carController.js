// External Dependancies
const mongoose = require("mongoose");
const createError = require("http-errors");

// Get Data Models
const Car = require("../models/Car");

// Get all cars
exports.getCars = async (req, reply) => {
  //req.log.info("Accessing all entries");
  try {
    const cars = await Car.find({});
    return cars;
  } catch (err) {
    return reply.send(new createError(err));
  }
};

// Get single car by ID
exports.getSingleCar = async (req, reply) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return reply.send(new createError.BadRequest("Invalid ID"));
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    if (car === null) return reply.send(new createError.NotFound("Unknown ID"));
    return car;
  } catch (err) {
    err.statusCode = 404;
    return err;
  }
};

// Add a new car
exports.addCar = async (req, reply) => {
  try {
    const car = new Car(req.body);
    return await car.save();
  } catch (err) {
    console.log(err);
    return reply.send(new createError(err));
  }
};

// Update an existing car
exports.updateCar = async (req, reply) => {
  try {
    const id = req.params.id;
    const car = req.body;
    const { ...updateData } = car;
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true });
    return update;
  } catch (err) {
    return reply.send(new createError(err));
  }
};

// Delete a car
exports.deleteCar = async (req, reply) => {
  try {
    const id = req.params.id;
    const car = await Car.findByIdAndRemove(id);
    return car;
  } catch (err) {
    return reply.send(new createError(err));
  }
};
