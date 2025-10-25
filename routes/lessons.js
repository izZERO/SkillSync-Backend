const router = require("express").Router()
const lessonCtrl = require("../controllers/lessons")

router.get('/:courseId', lessonCtrl.lessons_index_get)
router.get("/:lessonId", lessonCtrl.lesson_show_get)
router.post("/",lessonCtrl.lesson_new_post)

router.put("/:lessonId", lessonCtrl.lesson_update_put)


module.exports = router
