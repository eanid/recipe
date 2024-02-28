const { v4: uuidv4 } = require("uuid");
const {
	getRecipeDetailModel,
	getRecipeDetailCountModel,
    getRecipesModel,
    getRecipeByIdModel,
    createRecipe,
    updateRecipe,
} = require("../model/recipes");
const { search } = require("../router");

const RecipesController = {
    getRecipeDetail: async (req, res, next) => {
        try {
			// check searchBy
			let searchBy
			if(req.query.searchBy === ""){
				if(req.query.searchBy === "title" ||  req.query.searchBy === "ingredient"){
					searchBy = req.query.searchBy
				} else {
					searchBy = "title"
				}
			} else{
				searchBy = "title"
			}
			// check sortBy
			let sortBy
			if(req.query.sortBy === ""){
				if(req.query.sortBy === "created_at" ||  req.query.sortBy === "updated_at"){
					sortBy = req.query.sortBy
				} else {
					sortBy = "created_at"
				}
			} else{
				sortBy = "created_at"
			}
			// check sort
			let sort
			if(req.query.sort === ""){
				if(req.query.sort === "ASC" ||  req.query.sort === "DESC"){
					sort = req.query.sort
				} else {
					sort = "ASC"
				}
			} else{
				sort = "ASC"
			}
			let search = req.query.search || ""
			let limit = req.query.limit || 3
			let offset = ((req.query.page || 1) - 1) * parseInt(limit)

			let data = {searchBy,search,sortBy,sort,limit,offset}

            let recipes = await getRecipeDetailModel(data);
            let count = await getRecipeDetailCountModel(data);
			let total = count.rowCount
            let result = recipes.rows;
			let page_next
			if(req.query.page == Math.round(total/parseInt(limit))){
				page_next = 0
			} else {
				page_next = parseInt(req.query.page) + 1
			}
			
			let pagination = {
				page_total : Math.round(total/parseInt(limit)),
				page_prev: parseInt(req.query.page) - 1,
				page_next,
				total_data : total
			}
            
            return res
                .status(200)
                .json({ message: "success getRecipeDetail", data: result ,pagination});
        } catch (err) {
            console.log("getRecip error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getRecipeDetail Controller" });
        }
    },
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
