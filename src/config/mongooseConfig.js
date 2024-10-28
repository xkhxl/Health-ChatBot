import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); //loads the environment variables

const url = process.env.DB_URL;
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("Unable to connect to mongodb");
    console.log(error);
  }
};
