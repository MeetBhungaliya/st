const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  
  job_title: {
    type: String,
    required: true,
  },
  job_image: {
    type: String,
    // required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  can_fresher_apply: {
    type: Boolean,
    default: false,
  },
  
});

module.exports = mongoose.model("Job", jobSchema);
