const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  service: {
    type: Array,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  when_to_start: {
    type: String,
    required: true,
  },
  requirement: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
  },
  files: {
    type: Array,
  },
});

module.exports = mongoose.model("quote", quoteSchema);
