const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema({
  photoName: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Photo", PhotoSchema);
