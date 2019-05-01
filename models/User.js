// External Dependancies
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    guid: String,
    isActive: {
      type: Boolean,
      required: [true, "Missing isActive status."]
    },
    balance: Number,
    picture: {
      type: String
    },
    age: {
      type: Number,
      required: true,
      min: [21, "Too young to use the app."],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer."
      }
    },
    name: String,
    gender: {
      type: String,
      enum: ["Male", "Female"]
    },
    company: String,
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    phone: String,
    address: String,
    registered: {
      type: Date,
      default: Date.now
    },
    latitude: String,
    longitude: String,
    tags: [String],
    friends: [
      {
        id: Number,
        name: String
      }
    ]
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
