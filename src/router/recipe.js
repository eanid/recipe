const express = require("express");
const RecipesController = require("../controller/recipes")
const router = express.Router()
const {Protect} = require("../middleware/private");
const upload = require("../middleware/photo");

router.get("/",RecipesController.getRecipe)
router.get("/detail",RecipesController.getRecipeDetail)
router.get("/:id",RecipesController.getRecipeById)
router.post("/",Protect,upload.single("photo"),RecipesController.InputRecipe)
router.put("/:id",Protect,upload.single("photo"),RecipesController.PutRecipe)

module.exports = router