const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const DB_URL = process.env.DB_URL;

const connectDatabase = () => {
  mongoose
    .connect(DB_URL)
    .then((data) => {
      console.log(`Mongodb connect with server: ${data.connection.host}`);
    })
    .catch(() => {
      console.log("Mongodb Not Connect");
    });
};

module.exports = connectDatabase;

// mongodb+srv://anuiplumber:<anuiplumber>@cluster0.psw82.mongodb.net/?retryWrites=true&w=majority