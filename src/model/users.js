const Pool = require("../config/db")

const getUserByEmail = async (email) => {
	console.log("model - getUserByEmail")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM users WHERE email='${email}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const inputUser = async (data) => {
	console.log("model - inputUser")
	let {id,email,password, name, otp} = data
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO users (id, email, password, name, otp, created_at ) VALUES ('${id}', '${email}', '${password}', '${name}', '${otp}', NOW())`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const activatedUser = async(id) => {
	console.log("model - activatedUser")
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE users SET is_verif=true WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const getUserById = async (id) => {
	console.log("model - getUserById")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM users WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

module.exports = {getUserByEmail,inputUser,activatedUser,getUserById}