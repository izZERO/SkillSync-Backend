const router = require("express").Router()
const authController = require("../controllers/authController")
const middleware = require("../middleware/index")

router.post("/register", authController.auth_register_post)
router.post("/login", authController.auth_login_post)
router.put(
  "/update/:id",
  middleware.stripToken,
  middleware.verifyToken,
  authController.auth_updatePassword_put
)

module.exports = router
