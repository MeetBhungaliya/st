const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  applyAs: {
    type: String,
    required: true,
  },
  qualification: {
    type: Array,
  },
  experience: {
    type: Object,
  },
  currCompanyDetail: {
    type: Array,
  },
  workingPeriod: {
    type: String,
  },
  images: {
    type: Array,
  },
});

module.exports = mongoose.model("HireForm", hireSchema);
