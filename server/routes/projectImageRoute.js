const express = require("express");
const {
  insertImage,
  getImages,
  deleteImage,
  updateImage,
} = require("../controller/projectImageController");
const router = express.Router();
const userdocupload = require("../utils/imageUploads");

router.post("/project/image", userdocupload.array("job_image"), insertImage);
router.get("/project/image", getImages);
router.delete("/project/image", deleteImage);
router.put("/project/image", userdocupload.array("job_image"), updateImage);

module.exports = router;
