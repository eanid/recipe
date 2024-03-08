const { v4: uuidv4 } = require("uuid");
const { getUserByEmail, inputUser } = require("../model/users");
const argon2 = require("argon2")
const {GenerateToken} = require("../helper/token")

const UserController = {
    register: async (req, res, next) => {
        let { email, password } = req.body;
        if (!email || !password || email == "" || password == "") {
            return res
                .status(401)
                .json({
                    status: 401,
                    messages: "email & password is required",
                });
        }
        let user = await getUserByEmail(email);
        if (user.rowCount === 1) {
            return res
                .status(401)
                .json({ status: 401, messages: "email already register" });
        }
		password = await argon2.hash(password)
        let data = {
            id: uuidv4(),
            email,
            password,
        };

		let result = await inputUser(data)
		console.log("result")
		console.log(result)

        return res.status(201).json({ status: 201, messages: "register success please login" });
    },
    login: async (req, res, next) => {
		let { email, password } = req.body;
        if (!email || !password || email == "" || password == "") {
            return res
                .status(401)
                .json({
                    status: 401,
                    messages: "email & password is required",
                });
        }
        let user = await getUserByEmail(email);
        if (user.rowCount === 0) {
            return res
			.status(401)
			.json({ status: 401, messages: "email not register" });
        }
		let userData = user.rows[0]
		
		let isVerify = await argon2.verify(userData.password,password)
        if (!isVerify) {
			return res
			.status(401)
			.json({ status: 401, messages: "password wrong" });
        }
		console.log(userData)

		delete userData.password
		let token = GenerateToken(userData)
		
		return res.status(201).json({ status: 201, messages: "register success",token });
	},
};

module.exports = UserController;
