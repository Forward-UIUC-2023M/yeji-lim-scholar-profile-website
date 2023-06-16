const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Photo = require("../models/Photo");

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

/**
 * ITEM IMAGE STORING STARTS
 */
const s3 = new aws.S3({
  accessKeyId: "AKIA57GDJ5U727NGJ7MK",
  secretAccessKey: "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",
  Bucket: "forward-data-scholar-profile",
});

/**
 * Single Upload
 */
const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "forward-data-scholar-profile",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("itemImage");

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|docx|doc/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Not jpeg, jpg, png, gif, pdf, or docx!");
  }
}

// @desc    Create new photo to item
// @route   POST /api/photo
// @access  Public
exports.photoUpload = asyncHandler(async (req, res, next) => {
  imageUpload(req, res, (error) => {
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          photoName: imageName,
          location: imageLocation,
        });
      }
    }
  });
});
