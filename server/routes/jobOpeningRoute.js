const express = require("express");
const router = express.Router();
const {
  postjob,
  getjobs,
  DeleteJob,
  UpdateJob,
} = require("../controller/jobsController");
const userdocupload = require("../utils/imageUploads");
const auth = require("../utils/auth");

router.post("/jobs", auth, userdocupload.single("job_image"), postjob);
router.get("/jobs", getjobs);
router.delete("/jobs/:id", auth, DeleteJob);
router.put("/jobs/:id", auth, userdocupload.single("job_image"), UpdateJob);

module.exports = router;
