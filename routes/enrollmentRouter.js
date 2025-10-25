const router = require("express").Router()
const enrollmentCtrl = require("../controllers/enrollmentController")
const middleware = require("../middleware/index")

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  enrollmentCtrl.enrollment_enrollStudent_post
)

router.get(
  "/currentUser",
  middleware.stripToken,
  middleware.verifyToken,
  enrollmentCtrl.enrollment_currentUserEnrollments_get
)

router.get(
  "/course/:courseId",
  middleware.stripToken,
  middleware.verifyToken,
  enrollmentCtrl.enrollment_allCourseEnrollments_get
)

router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  enrollmentCtrl.enrollment_oneEnrollment_get
)

router.put(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  enrollmentCtrl.enrollment_updateEnrollment_put
)

router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  enrollmentCtrl.enrollment_unEnroll_delete
)

module.exports = router
