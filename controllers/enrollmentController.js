const { model } = require("mongoose")
const Enrollment = require("../models/Enrollment")
require("../models/Course")
require("../models/User")

exports.enrollment_enrollStudent_post = async (req, res) => {
  try {
    const studentId = res.locals.payload.id
    const courseId = req.body.courseId

    const existingEnrollment = await Enrollment.findOne({
      studentId,
      courseId,
    })

    if (existingEnrollment) {
      return res.status(400).send({
        status: "Error",
        msg: "Already enrolled in this course",
      })
    }

    const enrollment = await Enrollment.create({
      studentId,
      courseId,
      progress: 0,
      status: "in-progress",
    })
    res.status(200).send(enrollment)
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", msg: "An error occurred enrolling student" })
  }
}

exports.enrollment_currentUserEnrollments_get = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      studentId: res.locals.payload.id,
    }).populate({
      path: "courseId",
      model: "Course",
      populate: {
        path: "instructor",
        model: "User",
      },
    })
    res.status(200).send(enrollments)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "Error",
      msg: "An error occurred fetching user enrollments",
    })
  }
}

exports.enrollment_allCourseEnrollments_get = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ courseId: req.params.courseId })
      .populate("studentId")
      .populate("courseId")
    res.status(200).send(enrollments)
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", msg: "An error occurred fetching enrollments" })
  }
}

exports.enrollment_oneEnrollment_get = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("studentId")
      .populate({
        path: "courseId",
        model: "Course",
        populate: {
          path: "instructor",
          model: "User",
        },
      })

    if (!enrollment) {
      return res
        .status(404)
        .send({ status: "Error", msg: "Enrollment not found" })
    }

    res.status(200).send(enrollment)
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", msg: "An error occurred fetching enrollment" })
  }
}

exports.enrollment_updateEnrollment_put = async (req, res) => {
  try {
    const existingEnrollment = await Enrollment.findById(req.params.id)

    if (!existingEnrollment) {
      return res
        .status(404)
        .send({ status: "Error", msg: "Enrollment not found" })
    }

    // Ensure the enrollment belongs to the current user
    if (existingEnrollment.studentId.toString() !== res.locals.payload.id) {
      return res.status(403).send({
        status: "Error",
        msg: "Unauthorized - You can only update your own enrollments",
      })
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("studentId")
      .populate({
        path: "courseId",
        model: "Course",
        populate: {
          path: "instructor",
          model: "User",
        },
      })

    res.status(200).send(enrollment)
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", msg: "An error occurred updating enrollment" })
  }
}

exports.enrollment_unEnroll_delete = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)

    if (!enrollment) {
      return res
        .status(404)
        .send({ status: "Error", msg: "Enrollment not found" })
    }

    // Ensure the enrollment belongs to the current user
    if (enrollment.studentId.toString() !== res.locals.payload.id) {
      return res.status(403).send({
        status: "Error",
        msg: "Unauthorized - You can only unenroll from your own courses",
      })
    }

    await Enrollment.findByIdAndDelete(req.params.id)

    res
      .status(200)
      .send({ status: "Success", msg: "Successfully unenrolled from course" })
  } catch (error) {
    res.status(500).send({
      status: "Error",
      msg: "An error occurred unenrolling from course",
    })
  }
}
