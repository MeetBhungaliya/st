const express = require("express");
const {
  addDeveloper,
  deketeDeveloper,
  getAllData,
} = require("../controller/hireDeveloper");
const router = express.Router();
const userdocupload = require("../utils/imageUploads");
const auth = require("../utils/auth");

router.post("/developer", userdocupload.array("images"), addDeveloper);
router.get("/developer", getAllData);
router.delete("/developer/:id", deketeDeveloper);

module.exports = router;
