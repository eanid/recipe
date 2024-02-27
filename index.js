const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser')
const Router = require("./src/router")
const app = express();
const port = 3000;

const corsOption = {
	origin : '*',
	optionSuccessStatus:200
}

app.use(cors(corsOption))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan("combined"))

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(Router)

app.listen(port, () => {
    console.log(`The app listening on port ${port}, open in http://localhost:${port}`);
});
