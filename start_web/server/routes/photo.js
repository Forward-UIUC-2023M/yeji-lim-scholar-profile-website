const express = require("express");

const { photoUpload } = require("../controllers/photo");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").post(protect, photoUpload);

module.exports = router;
