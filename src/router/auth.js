const express = require("express");
const AuthController = require("../controller/users")
const router = express.Router()

router.post("/login",AuthController.login)
router.post("/register",AuthController.register)
router.get("/activated/:id/:otp",AuthController.verification)

module.exports = router