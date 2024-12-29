const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => { 
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/testify"),
    await mongoose.connect(`mongodb+srv://gouravvishwakarma049:${process.env.MONGO_PASSWORD}@testify-db.xdt3a.mongodb.net/?retryWrites=true&w=majority&appName=Testify-db`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
