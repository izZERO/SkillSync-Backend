const router = require("express").Router()
const userCtrl = require("../controllers/userController")
const middleware = require("../middleware/index")
const upload = require("../middleware/multer")

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.user_profile_get
)

router.put(
  "/update",
  middleware.stripToken,
  middleware.verifyToken,
  upload.single("profilePicture"),
  userCtrl.user_updateProfile_put
)

router.delete(
  "/delete",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.user_deleteProfile_delete
)

module.exports = router
