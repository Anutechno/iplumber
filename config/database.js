const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const DB = process.env.DB_URL;

const connectDatabase = () => {
  mongoose
    .connect(DB)
    .then((data) => {
      console.log(`Mongodb connect with server: ${data.connection.host}`);
    })
    .catch(() => {
      console.log("Mongodb Not Connect");
    });
};

module.exports = connectDatabase;
