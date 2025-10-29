const Lesson = require("../models/Lesson.js")
const Course = require("../models/Course.js")

const lessons_index_get = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
    const allLessons = await Lesson.find({ _id: course.lessons }).sort({
      order: 1,
    })
    res.status(200).send(allLessons)
  } catch (error) {
    res.status(500).send({ msg: "Error getting the lessons", error })
  }
}

const lesson_show_get = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) return res.status(404).send({ msg: "lesson not found" })
    res.status(200).send(lesson)
  } catch (error) {
    res.status(500).send({ msg: "Error getting the lesson", error })
  }
}

const lesson_new_post = async (req, res) => {
  try {
    const instructorId = res.locals.payload.id
    const course = await Course.findById(req.params.courseId)
    if (!course) {
      return res.status(404).send({ msg: "course not found" })
    }

    if (course.instructor.toString() !== instructorId) {
      return res.status(403).send({ msg: "Unauthorized" })
    }
    const existingLessons = await Lesson.find({ course: req.params.courseId })
    const order = existingLessons.length + 1
    const lesson = await Lesson.create({
      ...req.body,
      course: req.params.courseId,
      order,
    })
    course.lessons.push(lesson._id)
    await course.save()
    res.status(200).send(lesson)
  } catch (error) {
    res.status(500).send({ msg: "Error creating a new lesson", error })
  }
}
const lesson_update_put = async (req, res) => {
  try {
    const currentUser = res.locals.payload.id
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) {
      return res.status(404).send({ msg: "lesson not found!", error })
    }
    const updatedLesson = await Lesson.findByIdAndUpdate(lesson._id, req.body, {
      new: true,
    })
    res.status(200).send({ msg: "updatedLesson", lesson: updatedLesson })
  } catch (error) {
    res.status(500).send({ msg: "Error editing a lesson!", error })
  }
}

const lesson_delete_delete = async (req, res) => {
  try {
    const currentUser = res.locals.payload.id
    const lesson = await Lesson.findById(req.params.lessonId)
    const course = await Course.findById(req.params.courseId)
    if (!lesson) {
      return res.status(404).send({ msg: "lesson not found!", error })
    }
    if (course.instructor.toString() !== currentUser) {
      return res.status(403).send({ msg: "Unauthorized" })
    }
    await Course.findByIdAndUpdate(course._id, {
      $pull: { lessons: lesson._id },
    })
    await lesson.deleteOne()

    res.status(200).send({ msg: "lesson Deleted!", id: lesson._id })
  } catch (error) {
    res.status(500).send({ msg: "Error updating a lesson!", error })
  }
}

module.exports = {
  lessons_index_get,
  lesson_show_get,
  lesson_new_post,
  lesson_update_put,
  lesson_delete_delete,
}
