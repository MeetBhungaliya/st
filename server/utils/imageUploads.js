const multer = require("multer");

const userdocstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// const filefilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(mp4|webp|MPEG-4|mkv|mov|png|jpg|jpeg)$/)) {
//     return cb(new Error("Please upload a image"));
//   }
//   cb(undefined, true);
// };

const userdocupload = multer({
  storage: userdocstorage,
  limits: { fieldSize: 25 * 1024 * 1024 },
  // fileFilter: filefilter,
});

module.exports = userdocupload;
