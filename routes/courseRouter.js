const router = require("express").Router()
const courseCtrl = require("../controllers/courseController")
const middleware = require("../middleware/index")

router.get("/", courseCtrl.courses_index_get)
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

module.exports = router
