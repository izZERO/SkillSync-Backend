const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    objective: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    level: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Course = mongoose.model("Course", courseSchema)
module.exports = Course
