const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Form = require("../models/Form");

// @desc      Get all forms
// @route     Get /api/forms
// @access    Public
exports.getForms = asyncHandler(async (req, res, next) => {
  const forms = await Form.find(req.params.id);
  res.status(200).json({ success: true, data: forms });
});

// @desc    Get a single form info
// @route   GET /api/forms/:id
// @access  Public
exports.getForm = asyncHandler(async (req, res, next) => {
  const form = await Form.findById(req.params.id);

  if (!form) {
    return next(
      new ErrorResponse(`Form not found with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: form });
});

// @desc    Create new form
// @route   POST /api/forms
// @access  Private
exports.createForm = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check for published forms
  const publishedForm = await Form.findOne({ user: req.user.id });
  // can add only one Form
  if (publishedForm) {
    return next(
      new ErrorResponse(
        `User with ID ${req.user.id} has already published a form`,
        400
      )
    );
  }

  const { name } = req.body;
  console.log("file", req.body);
  // const resume = req.file.path;
  // const form = await Form.create({ name, resume });

  // // Create form
  const form = await Form.create(req.body);

  res.status(200).json({ success: true, data: form });
});

// @desc    Update form
// @route   PUT /api/forms/:id
// @access  Private
exports.updateForm = asyncHandler(async (req, res, next) => {
  console.log("updateForm ID: ", req.params.id);
  let form = await Form.findById(req.params.id);

  if (!form) {
    return next(
      new ErrorResponse(`Form not found with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is item owner
  if (form.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this item`,
        401
      )
    );
  }

  form = await Form.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: form });
});

// @desc    Delete form
// @route   DELETE /api/forms/:id
// @access  Private
exports.deleteForm = asyncHandler(async (req, res, next) => {
  let form = await Form.findById(req.params.id);

  if (!form) {
    return next(
      new ErrorResponse(`Form not found with the id of ${req.params.id}`, 404)
    );
  }

  console.log(form);

  // Make sure user is profile owner
  if (form.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this item`,
        401
      )
    );
  }
  // await Form.findById(req.params.id);
  form.deleteOne({ _id: req.params.id });
  // form.remove();

  res.status(200).json({ success: true, data: form });
});
