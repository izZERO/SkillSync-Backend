const Course = require("../models/Course")
require("../models/User")

exports.courses_index_get = async (req, res) => {
  try {
    const courses = await Course.find({}).populate("instructor")
    res.status(200).send(courses)
  } catch (error) {
    res.status(500).send({ msg: "Error getting all courses!", error })
  }
}

exports.courses_instructorIndex_get = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: res.locals.payload.id })
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

exports.course_update_put = async (req, res) => {
  try {
    const currentUser = res.locals.payload.id
    const course = await Course.findById(req.params.courseId)
    if (!course) {
      res.status(404).send({ msg: "Course not found!", error })
    }

    if (course.instructor.toString() !== currentUser) {
      res.status(403).send({ status: "Error", msg: "Unauthorized" })
    } else {
      await Course.updateOne({ _id: course._id }, req.body)
      res.status(200).send("Course Updated!")
    }
  } catch (error) {
    res.status(500).send({ msg: "Error editing a course!", error })
  }
}

exports.course_deleteCourse_delete = async (req, res) => {
  try {
    const currentUser = res.locals.payload.id
    const course = await Course.findById(req.params.courseId)
    if (!course) {
      res.status(404).send({ msg: "Course not found!", error })
    }

    if (course.instructor.toString() !== currentUser) {
      res.status(403).send({ status: "Error", msg: "Unauthorized" })
    } else {
      await course.deleteOne()
      res.status(200).send("Course Deleted!")
    }
  } catch (error) {
    res.status(500).send({ msg: "Error updating a course!", error })
  }
}
