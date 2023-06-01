const mongoose = require("mongoose");
const Profiles = require("./Profile");

const ProfilesSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    education : [{
        type : String,
    }],
    institution: String,
    title : [{
        type : String,
    }],
    photo: {
    type: String,
    default: "no-photo.jpg",
    },
    user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    },
});

module.exports = mongoose.model("Profiles", ProfilesSchema);
