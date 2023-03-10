const express = require("express");
const { sendEmailToAdmin } = require("../controller/mailController");
const router = express.Router();

router.post("/send-email", sendEmailToAdmin);

module.exports = router;