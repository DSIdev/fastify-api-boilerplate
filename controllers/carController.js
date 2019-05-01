// External Dependancies
const boom = require("boom");
const mongoose = require("mongoose");

// Get Data Models
const Car = require("../models/Car");

// Get all cars
exports.getCars = async (req, reply) => {
  //req.log.info("Accessing all entries");
  try {
    const cars = await Car.find({});
    return cars;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single car by ID
exports.getSingleCar = async (req, reply) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return new boom("Invalid ID provided", {
      statusCode: 404
    });
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    if (car === null)
      return new boom("ID not found", {
        statusCode: 404
      });
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
    throw boom.boomify(err);
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
    throw boom.boomify(err);
  }
};

// Delete a car
exports.deleteCar = async (req, reply) => {
  try {
    const id = req.params.id;
    const car = await Car.findByIdAndRemove(id);
    return car;
  } catch (err) {
    throw boom.boomify(err);
  }
};
