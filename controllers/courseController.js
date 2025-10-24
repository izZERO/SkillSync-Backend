const Course = require("../models/Course")

exports.courses_index_get = async (req, res) => {
  try {
    const courses = await Course.find({})
    res.status(200).send(courses)
  } catch (error) {
    res.status(500).send({ msg: "Error getting all courses!", error })
  }
}

exports.course_new_post = async (req, res) => {
  try {
    const instructorId = res.locals.payload.id
    const course = await Course.create({
      ...req.body,
      instructor: instructorId,
    })
    res.status(200).send(course)
  } catch (error) {
    res.status(500).send({ msg: "Error creating a new course!", error })
  }
}

exports.course_show_get = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
    res.status(200).send(course)
  } catch (error) {
    res.status(500).send({ msg: "Error getting a course!", error })
  }
}
