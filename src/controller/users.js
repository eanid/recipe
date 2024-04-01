const { v4: uuidv4 } = require("uuid");
const {
    getUserByEmail,
    inputUser,
    getUserById,
    activatedUser,
} = require("../model/users");
const argon2 = require("argon2");
const { GenerateToken } = require("../helper/token");
const { sendEmailActivated } = require("../helper/email");

const UserController = {
    register: async (req, res, next) => {
        let { email, password, name } = req.body;
        if (
            !email ||
            !password ||
            !name ||
            email == "" ||
            password == "" ||
            name === ""
        ) {
            return res.status(401).json({
                status: 401,
                messages: "email, password and name is required",
            });
        }
        let user = await getUserByEmail(email);
        if (user.rowCount === 1) {
            return res
                .status(401)
                .json({ status: 401, messages: "email already register" });
        }
        password = await argon2.hash(password);
        let id =  uuidv4();
        let otp =  uuidv4()
        let data = {
            id,
            email,
            password,
            name,
            otp,
        };

        let url = `http://localhost:3000/auth/activated/${id}/${otp}`

        let sendOTP = await sendEmailActivated(email,url,name)

        if(!sendOTP){
            return res
            .status(401)
            .json({ status: 401, messages: "register failed when send email" });
        }

        let result = await inputUser(data);
        console.log("result");
        console.log(result);

        return res
            .status(201)
            .json({ status: 201, messages: "register success please check your email for activated accound" });
    },
    login: async (req, res, next) => {
        let { email, password } = req.body;
        if (!email || !password || email == "" || password == "") {
            return res.status(401).json({
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
        let userData = user.rows[0];
        if (userData && userData.is_verif === false) {
            return res
                .status(401)
                .json({ status: 401, messages: "email not verified, please check your email to activated your account" });
        }

        let isVerify = await argon2.verify(userData.password, password);
        if (!isVerify) {
            return res
                .status(401)
                .json({ status: 401, messages: "password wrong" });
        }
        console.log(userData);

        delete userData.password;
        let token = GenerateToken(userData);

        return res
            .status(201)
            .json({ status: 201, messages: "login success", token, data: userData });
    },
    verification: async (req, res, next) => {
        let { id, otp } = req.params;

        let user = await getUserById(id);
        if (user.rowCount === 0) {
            return res
                .status(404)
                .json({ status: 404, messages: "email not register" });
        }
        let userData = user.rows[0];

        if (otp !== userData.otp) {
            return res
                .status(404)
                .json({ status: 404, messages: "otp invalid" });
        }

        let activated = await activatedUser(id);

        if (!activated) {
            return res
                .status(404)
                .json({ status: 404, messages: "account failed verification" });
        }

        return res
            .status(201)
            .json({ status: 201, messages: "account success verification" });
    },
};

module.exports = UserController;
