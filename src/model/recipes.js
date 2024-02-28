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
		Pool.query(`SELECT * FROM recipes WHERE id='${id}'`,(err,res)=>{
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
	let {id,title,ingredient,photo} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO recipes (id,title,ingredient,photo,created_at) VALUES ('${id}','${title}','${ingredient}','${photo}',NOW());`,(err,res)=>{
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
	let {id,title,ingredient,photo} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE recipes SET updated_at=NOW(), title='${title}', ingredient='${ingredient}', photo='${photo}' WHERE id='${id}'`,(err,res)=>{
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