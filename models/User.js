const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    bio: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "public/images/defaultpfp.svg",
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
module.exports = User
