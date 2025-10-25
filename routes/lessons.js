const router = require("express").Router()
const lessonCtrl = require("../controllers/lessons")

router.get('/:courseId', lessonCtrl.get_lessons)
