const mongoose = require("mongoose");
const mongoURI = process.env.mongoURI;

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/FYP" );
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
