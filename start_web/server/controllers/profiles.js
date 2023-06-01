const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Profile = require("../models/Profile");

// @desc    Get a single profile
// @route   GET /api/profiles/:id
// @access  Public
exports.getProfile = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findById(req.params.id);
  
    if (!profile) {
      return next(
        new ErrorResponse(`Profile not found with the id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: profile });
});
  
// @desc    Create new profile
// @route   POST /api/profiles
// @access  Private
exports.createProfile = asyncHandler(async (req, res, next) => {
// Add user to req.body
req.body.user = req.user.id;

// Create profile
const profile = await Profile.create(req.body);

res.status(200).json({ success: true, data: profile });
});

// @desc    Update profile
// @route   PUT /api/profiles/:id
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  console.log("updateProfile ID: ", req.params.id);
  let profile = await Profile.findByIdAndUpdate(req.params.id);

  if (!profile) {
    return next(
      new ErrorResponse(`Profile not found with the id of ${req.params.id}`, 404)
    );
  }

  profile = await Profile.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: profile });
});

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
// @access  Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findByIdAndDelete(req.params.id);
  
    if (!profile) {
      return next(
        new ErrorResponse(`Profile not found with the id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is profile owner
    if (profile.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to delete this profile`,
          401
        )
      );
    }
  
    profile.remove();
  
    res.status(200).json({ success: true, data: profile });
  });