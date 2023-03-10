const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sendEmail = require("./routes/emailRoute");
const jobs = require("./routes/jobOpeningRoute");
const quotes = require("./routes/quoteRoute");
const projectImage = require("./routes/projectImageRoute");
const contact = require("./routes/contactRoute");
const admin = require("./routes/adminRoute");
const developer = require("./routes/hiredeveloperRoute");
const connectDB = require("./database/connection");
// const path = require("path");
// const myproduct = require("./routes/myRouter")
const PORT = process.env.PORT || 4000;
// const app = Royexpress();
const app = express();
mongoose.set("strictQuery", false);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", sendEmail);
app.use("/api", jobs);
app.use("/api", quotes);
app.use("/api", projectImage);
app.use("/api", contact);
app.use("/api", admin);
app.use("/api", developer);
// app.use("/api", productrout)

(async () => {
  try {
    app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
    await connectDB();
  } catch (err) {
    console.log(err);
  }
})();
