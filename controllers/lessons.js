const Lesson = require("../models/Lesson.js")
const Course = require("../models/Course.js")

const lessons_index_get = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId})
    res.status(200).send(lessons)
  }
  catch (error) {
    res.status(500).send({msg: "Error getting the lessons", error})
  }
}

const lesson_show_get = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) return res.status(404).send({msg:"lesson not found"})
res.status(200).send(lesson)
  }
  catch (error) {
    res.status(500).send({msg: "Error getting the lesson", error})
  }
}

const lesson_new_post =async (req, res) => {
  try{
    const instructorId = res.locals.payload.id
    const course = await Course.findById(req.body.course)
    if(!course) {
      return res.status(404).send({msg: "course not found"})
    }
    if (course.instructor.toString() !== instructorId){
return res.status(404).send({msg: "unautharized"})
    }
    const existingLessons = await Lesson.find({course:req.body.course})
    const order = existingLessons.length+1
    const lesson = await Lesson.create({
      ...req.body,
      order,
    })
    course.lessons.push(lesson._id)
    await course.save()

    res.status(200).send(lesson)
  }
  catch (error) {
  res.status(500).send({ msg: "Error creating a new lesson", error })
}

}
const lesson_update_put = async (req, res) => {
  try {
    const currentUser = res.locals.payload.id
    const lesson = await Course.findById(req.params.lessonId)
    if (!lesson) {
      res.status(404).send({ msg: "lesson not found!", error })
    }

    if (course.instructor.toString() !== currentUser) {
      res.status(403).send({ status: "Error", msg: "Unauthorized" })
    } else {
      await Lesson.updateOne({ _id: lesson._id }, req.body)
      res.status(200).send("Lesson Updated!")
    }
  } catch (error) {
    res.status(500).send({ msg: "Error editing a lesson!", error })
  }
}















module.exports ={ lessons_index_get,lesson_show_get,lesson_new_post,lesson_update_put}
