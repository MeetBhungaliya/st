const express = require("express");
const router = express.Router();
const { getquotepost, postquotes , deletequotes } = require("../controller/quoteController");
const userdocupload = require("../utils/imageUploads");

router.post("/quote", userdocupload.array("files"), postquotes);
router.get("/quote", getquotepost);
router.delete("/quote/:id", deletequotes);

module.exports = router;
