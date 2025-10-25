const router = require("express").Router()
const lessonCtrl = require("../controllers/lessons")

router.get('/', lessonCtrl.get_lessons)
