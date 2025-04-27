import mongoose from "mongoose";
import dotenv from "dotenv";

// configure dotenv
dotenv.config();

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI as string;
    await mongoose.connect(url);
    console.log("MongoDB Got Connected!");
  } catch (error) {
    console.error(`MongoDB Connection Error : ${error}`);
  }
};
