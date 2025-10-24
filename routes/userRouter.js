const router = require("express").Router()
const userCtrl = require("../controllers/userController")
const middleware = require("../middleware/index")

router.get(
  "/profile",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.user_profile_get
)

router.put(
  "/profile/update",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.user_updateProfile_put
)

router.delete(
  "/profile/delete",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.user_deleteProfile_delete
)

module.exports = router
