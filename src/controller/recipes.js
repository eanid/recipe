const { v4: uuidv4 } = require("uuid");
const {
    getRecipesModel,
    getRecipeByIdModel,
    createRecipe,
    updateRecipe,
} = require("../model/recipes");

const RecipesController = {
    getRecipe: async (req, res, next) => {
        try {
            let recipes = await getRecipesModel();
            let result = recipes.rows;
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getRecipe", data: result });
        } catch (err) {
            console.log("getRecip error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getRecipe Controller" });
        }
    },
    getRecipeById: async (req, res, next) => {
        try {
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let recipes = await getRecipeByIdModel(id);
            let result = recipes.rows;
            if (!result.length) {
                return res
                    .status(404)
                    .json({ message: "recipe not found or id invalid" });
            }
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getRecipeById", data: result[0] });
        } catch (err) {
            console.log("getRecipeById error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getRecipeById Controller" });
        }
    },
    InputRecipe: async (req, res, next) => {
        try {
            let { title, ingredient, photo } = req.body;
            if (
                !title ||
                title === "" ||
                !ingredient ||
                ingredient === "" ||
                !photo ||
                photo === ""
            ) {
                return res.json({ code: 404, message: "input invalid" });
            }
            let data = { id: uuidv4(), title, ingredient, photo };
            let result = await createRecipe(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success input data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: "failed input data" });
        } catch (err) {
            console.log("InputRecipe error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed InputRecipe Controller" });
        }
    },
    PutRecipe: async (req, res, next) => {
        try {
            // check params & body
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let { title, ingredient, photo } = req.body;
            // check recipe
            let recipes = await getRecipeByIdModel(id);
            let resultRecipe = recipes.rows;
            if (!resultRecipe.length) {
                return res
                    .status(404)
                    .json({ message: "recipe not found or id invalid" });
            }
            let recipe = resultRecipe[0];
            let data = {
                id,
                title: title || recipe.title,
                ingredient: ingredient || recipe.ingredient,
                photo: photo || recipe.photo,
            };

            let result = await updateRecipe(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success update data" });
            }
            return res.status(401).json({code:401,message:"failed update data"})
        } catch (err) {
            console.log("InputRecipe error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed InputRecipe Controller" });
        }
    },
};

module.exports = RecipesController;
