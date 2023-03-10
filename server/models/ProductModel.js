const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({  
  
  category: {
    type: String,
    // required: true,
  },
  Full_image: {
    type: Array,
    // required: true,
  },
  Display_image: {
    type: Array,
    // required: true,
  },

});

module.exports = mongoose.model("Product", productSchema);