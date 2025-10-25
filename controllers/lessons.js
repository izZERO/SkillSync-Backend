const Lesson = require("../models/Lesson.js")
const Course = require("../models/Course.js")

const get_lessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId})
    res.status(200).send(lessons)
  }
  catch (error) {
    res.status(500).send({msg: "Error getting the lessons", error})
  }
}

const get_lesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) return res.status(404).send({msg:"lesson not found"})
res.status(200).send(lessons)
  }
  catch (error) {
    res.status(500).send({msg: "Error getting the lesson", error})
  }
}















module.exports ={ get_lessons,get_lesson}
