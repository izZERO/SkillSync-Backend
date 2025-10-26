const router = require("express").Router()
const authCtrl = require("../controllers/authController")
const middleware = require("../middleware/index")

router.post("/register", authCtrl.auth_register_post)
router.post("/login", authCtrl.auth_login_post)
router.put(
  "/update/:id",
  middleware.stripToken,
  middleware.verifyToken,
  authCtrl.auth_updatePassword_put
)
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  authCtrl.auth_checkSession_get
)

module.exports = router
