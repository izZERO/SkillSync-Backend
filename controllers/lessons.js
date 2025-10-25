const Lesson = require("../models/Lesson.js")
const Course = require("../models/Course.js")

const get_lessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId}).sort("order")
    res.status(200).send(lessons)
  }
  catch (error) {
    res.status(500).send({msg: "Error getting the lessons", error})
  }
}
