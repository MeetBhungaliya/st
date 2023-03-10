const mongoose = require("mongoose");

const productcategorySchema = new mongoose.Schema({  
  
  Productcategory: {
    type: Array,
  },
 
});

module.exports = mongoose.model("ProductCategory", productcategorySchema);