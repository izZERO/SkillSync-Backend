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

module.exports = router
