const express = require("express");
const RecipesController = require("../controller/recipes")
const router = express.Router()
const {Protect} = require("../middleware/private")

router.get("/",RecipesController.getRecipe)
router.get("/detail",RecipesController.getRecipeDetail)
router.get("/:id",RecipesController.getRecipeById)
router.post("/",Protect,RecipesController.InputRecipe)
router.put("/:id",Protect,RecipesController.PutRecipe)

module.exports = router