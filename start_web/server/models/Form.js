const mongoose = require("mongoose");
const Forms = require("./Form");

const FormSchema = mongoose.Schema({
  resume: String,
  links: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  extraInfo: {
    type: String,
  }
});

module.exports = mongoose.model("Forms", FormSchema);
