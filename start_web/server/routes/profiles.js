const express = require("express");

const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  searchProfiles,
  favoriteProfile,
  getFavoritedProfiles,
} = require("../controllers/profiles");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route('/favorited').get(protect, getFavoritedProfiles);

router.route("/").get(getProfiles).post(protect, createProfile);

router.route("/search").get(searchProfiles);

router.route("/:id").get(getProfile).put(protect, updateProfile).delete(protect, deleteProfile);

router.route('/:id/favorite').post(protect, favoriteProfile);

module.exports = router;
