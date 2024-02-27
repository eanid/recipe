const {getRecipesModel} = require("../model/recipes")

const RecipesController = {
	getRecipe:  async (req,res,next) => {
		try{
			let recipes = await getRecipesModel()
			console.log("recipes controller")
			let result = recipes.rows
			console.log(result)
			return res.status(200).json({message:"success getRecipe",data:result})
		} catch(err){
			console.log("recipes controller error")
			console.log(err)
			return res.status(404).json({message:"failed getRecipe Controller"})
		}
	}
}

module.exports = RecipesController