const express = require("express");
const RecipesController = require("../controller/recipes")
const router = express.Router()

router.get("/",RecipesController.getRecipe)
router.get("/:id",RecipesController.getRecipeById)
router.post("/",RecipesController.InputRecipe)
router.put("/:id",RecipesController.PutRecipe)

module.exports = router