const router = require("express").Router()
const authController = require("../controllers/authController")

router.post("/register", authController.auth_register_post)
router.post("/login", authController.auth_login_post)

module.exports = router
