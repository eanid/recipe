const express = require("express");
const router = express.Router();
const recipes = require("./recipe")
const auth = require("./auth")

router.use("/recipes",recipes)
router.use("/auth",auth)

module.exports = router