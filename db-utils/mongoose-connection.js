import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbName = "fsd58we-tamil-test";

// Local URL
// const url = "mongodb://127.0.0.1:27017";

// Cloud URL
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;

export const connectViaMongoose = async () => {
  try {
    await mongoose.connect(`${url}/${dbName}`);
    console.log("Connected to DB  Via Mongoose");
  } catch (e) {
    console.log("Error in connecting to DB", e);
    process.exit(1);
  }
};
