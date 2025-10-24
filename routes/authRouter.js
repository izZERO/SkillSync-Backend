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

module.exports = router
