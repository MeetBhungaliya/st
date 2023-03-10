const mongoose = require("mongoose");

const connectDB = () => mongoose.connect(process.env.MONGOOSE_URI);

module.exports = connectDB;
