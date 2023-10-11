const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MONGO IS CONNECTED"));
};

module.exports = connectDB;
