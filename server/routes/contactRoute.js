const {
  postcontact,
  getAllContact,
  deleteContact,
} = require("../controller/contactContoller");
const express = require("express");
const auth = require("../utils/auth");
const router = express.Router();
router.post("/contact", postcontact);
router.get("/contact", auth, getAllContact);
router.delete("/contact/:id", auth, deleteContact);

module.exports = router;
