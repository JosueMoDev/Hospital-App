const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CHAINCONNECTION);
    console.log("Data base up");
  } catch (error) {
    console.log(error);
    throw new Error("Data base connection error");
  }
};

module.exports = { dbConnection };
