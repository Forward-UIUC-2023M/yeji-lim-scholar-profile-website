const express = require("express");

const {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
} = require("../controllers/profiles");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").post(protect, createProfile);

router.route("/:id").get(getProfile).put(updateProfile).delete(protect, deleteProfile);

module.exports = router;
