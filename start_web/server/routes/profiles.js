const express = require("express");

const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  searchProfiles,
} = require("../controllers/profiles");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").get(getProfiles).post(protect, createProfile);

router.route("/search").get(searchProfiles);

router.route("/:id").get(getProfile).put(protect, updateProfile).delete(protect, deleteProfile);

module.exports = router;
