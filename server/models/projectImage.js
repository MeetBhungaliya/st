const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  files: {
    type: Array,
  },
});

imageSchema.set("timestamps", true);

module.exports = mongoose.model("ProjectImage", imageSchema);
