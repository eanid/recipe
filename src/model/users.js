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
	let {id,email,password} = data
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO users (id, email, password, created_at ) VALUES ('${id}', '${email}', '${password}', NOW())`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

module.exports = {getUserByEmail,inputUser}