const router = require("express").Router()
const userCtrl = require("../controllers/userController")
const middleware = require("../middleware/index")

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
  userCtrl.user_updateProfile_put
)

router.delete(
  "/delete",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.user_deleteProfile_delete
)

module.exports = router
