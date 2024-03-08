const Pool = require("../config/db")

const getRecipeDetailModel = async (data) => {
	let {searchBy,search,sortBy,sort,limit,offset} = data
	console.log("model - getRecipeDetailModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM recipes WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const getRecipeDetailCountModel = async (data) => {
	let {searchBy,search} = data
	console.log("model - getRecipeDetailCountModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM recipes WHERE ${searchBy} ILIKE '%${search}%'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const getRecipesModel = async () => {
	console.log("model - getRecipesModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM recipes`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const getRecipeByIdModel = async (id) => {
	console.log("model - getRecipeByIdModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT recipes.id,recipes.title,recipes.ingredient,recipes.photo,recipes.created_at,recipes.updated_at,category.name as category, users.email as author FROM recipes JOIN category ON recipes.category_id=category_id JOIN users ON recipes.users_id=users.id WHERE recipes.id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const createRecipe = async (data) => {
	console.log("model - createRecipe")
	let {id,title,ingredient,photo,users_id,category_id} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO recipes (id,title,ingredient,photo,created_at,users_id,category_id) VALUES ('${id}','${title}','${ingredient}','${photo}',NOW(),'${users_id}',${category_id});`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const updateRecipe = async (data) => {
	console.log("model - updateRecipe")
	let {id,title,ingredient,photo,category_id} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE recipes SET updated_at=NOW(), title='${title}', ingredient='${ingredient}', photo='${photo}', category_id=${category_id} WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

module.exports = {getRecipesModel,getRecipeByIdModel,createRecipe,updateRecipe,getRecipeDetailModel,getRecipeDetailCountModel}