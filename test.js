const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }))

let users = [
	{id:1,name:"adi"},
	{id:2,name:"budi"},
	{id:3,name:"cecep"},
	{id:4,name:"dani"},
]

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// create
app.post("/users", (req, res) => {
	let {name} = req.body
	if(!name || name === ""){
		return res.json({ode:404,message:"input name invalid"});
	}
	console.log(name)
	let nextId = users.map((item)=>item.id).sort((a,b)=>b-a)[0] + 1
	let user = {id:nextId,name}
	users=[...users,user]
    return res.json({code:201,message:`success create user ${name}`});
});

// read
app.get("/users", (req, res) => {
	res.status(205).json(users);
});
// read detail
app.get("/users/:id", (req, res) => {
	let {id} = req.params
	let user
	users.forEach(item => {
		if(item.id == id){
			user=item
		}
	});
	if(!user){
		return res.json({code:404,message:"user not found"});
	}
    return res.json(user);
});

// update
app.put("/users/:id",(req,res)=>{
	let {id} = req.params
	let {name} = req.body
	let user;
	users.forEach(item => {
		if(item.id == id){
			user=item
		}
	});
	if(!user){
		return res.json({code:404,message:"user not found"});
	}
	if(!name || name === ""){
		return res.json({code:404,message:"input name invalid"});
	}
	let newUser = {
		id:parseInt(id),name
	}
	let data = users.filter((item)=>item.id!=id)
	data = [...data,newUser]
	users = [...data]
    return res.json({code:200,message:`success update user ${id} : ${name}`});

})

// delete
app.delete("/users/:id", (req, res) => {
	let {id} = req.params

	// check user 
	let user
	users.forEach(item => {
		if(item.id == id){
			user=item
		}
	});
	if(!user){
		return res.status(404).json({code:404,message:"user not found"});
	}
	let data = users.filter(item=>item.id!=id)
	users = [...data]
    return res.json({code:200,message:`success delete user with id : ${id}`});
});

app.listen(port, () => {
    console.log(`The app listening on port ${port}, open in http://localhost:${port}`);
});
