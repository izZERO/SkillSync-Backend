const router = require("express").Router()
const lessonCtrl = require("../controllers/lessonController")
const middleware = require("../middleware/index")

router.get(
  "/courses/:courseId/lessons",
  middleware.stripToken,
  middleware.verifyToken,
  lessonCtrl.lessons_index_get
)

router.get(
  "/courses/:courseId/lessons/:lessonId",
  middleware.stripToken,
  middleware.verifyToken,
  lessonCtrl.lesson_show_get
)

router.post(
  "/courses/:courseId/lessons",
  middleware.stripToken,
  middleware.verifyToken,
  lessonCtrl.lesson_new_post
)

router.put(
  "/courses/:courseId/lessons/:lessonId",
  middleware.stripToken,
  middleware.verifyToken,
  lessonCtrl.lesson_update_put
)

router.delete(
  "/courses/:courseId/lessons/:lessonId",
  middleware.stripToken,
  middleware.verifyToken,
  lessonCtrl.lesson_delete_delete
)

module.exports = router
