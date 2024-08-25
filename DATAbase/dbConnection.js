const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  await mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
      console.log("Connection successful with DB");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
};

module.exports = connectDB;
