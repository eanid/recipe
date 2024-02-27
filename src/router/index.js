const express = require("express");
const router = express.Router();
const recipes = require("./recipe")

router.use("/recipes",recipes)

module.exports = router