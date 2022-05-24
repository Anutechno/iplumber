const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const users = require("./routers/userRouter");
const plumbers = require("./routers/plumberRouter");
const planes = require("./routers/planeRouter");

app.use("/api/v1", users);
app.use("/api/v1", plumbers);
app.use("/api/v1", planes);


module.exports = app;
