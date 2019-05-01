const mongoose = require("mongoose");

const mgtChainSchema = new mongoose.Schema({
  empID: {
    type: Number,
    required: true
  },
  empName: {
    type: String,
    required: true
  },
  empEmail: {
    type: String,
    required: true
  }
});
const reporteesSchema = new mongoose.Schema({
  empID: {
    type: Number,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
const UserSchema = new mongoose.Schema(
  {
    empId: {
      type: Number,
      required: true
    },
    WDID: {
      type: String
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    appLevel: {
      type: Number,
      required: true
    },
    empBand: {
      type: String,
      required: true
    },
    empDesignation: {
      type: String,
      required: true
    },
    empEmail: {
      type: String,
      required: true
    },
    empLocation: {
      type: String,
      required: true
    },
    empName: {
      type: String,
      required: true
    },
    mgtChain: [mgtChainSchema],
    orgUnit: {
      type: String,
      required: true
    },
    reportees: [reporteesSchema],
    password: {
      type: String,
      required: true
    }
  },
  { collection: "oousers" }
);

const OOUser = mongoose.model("OOUser", UserSchema);
module.exports = OOUser;
