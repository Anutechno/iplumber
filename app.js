const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const users = require("./routers/userRouter");

app.use("/api/v1", users);


module.exports = app;
