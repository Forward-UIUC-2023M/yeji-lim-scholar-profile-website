const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc      Register user
// @route     POST /api /auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName,lastName, email, password } = req.body;

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Get current logged in
// @route     POST /api/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/auth/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
    console.log("updatUser ID: ", req.params.id);
    let user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorResponse(
          `User not found with the id of ${req.params.id}`,
          404
        )
      );
    }
  
    // // Make sure user is item owner
    // if (profile.user.toString() !== req.user.id) {
    //   return next(
    //     new ErrorResponse(
    //       `User ${req.params.id} is not authorized to update this item`,
    //       401
    //     )
    //   );
    // }
  
    user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({ success: true, data: user });
  });


// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;
//   const resetUrl = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;

  // To-do: create a frontend link to reset password
  // const message = `You are receiving this email because you (or someone else) has requested the reset of a password.
  // Please make a PUT request to: \n\n ${resetUrl}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. 
      Please make change you password at this link: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message
    });

    res.status(200).json({
      success: true,
      data: "Email sent",
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, data: user});
};
