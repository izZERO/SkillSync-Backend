const router = require("express").Router()
const courseCtrl = require("../controllers/courseController")
const middleware = require("../middleware/index")

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_index_get
)
router.get(
  "/instructor",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_instructorIndex_get
)
router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.course_new_post
)
router.get("/:courseId", courseCtrl.course_show_get)
router.put(
  "/:courseId/edit",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.course_update_put
)
router.delete(
  "/:courseId",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.course_deleteCourse_delete
)

module.exports = router
