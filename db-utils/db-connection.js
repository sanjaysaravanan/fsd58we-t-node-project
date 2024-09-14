import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const dbName = "fsd58we-tamil-test";

// local DB
// const url = "mongodb://localhost:27017"; // 'localhost:27017'

// cloud DB
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;

export const client = new mongodb.MongoClient(url);

// all the queries will written on top of this DB
export const db = client.db(dbName);

// connect to db function
export const connectToDb = async () => {
  try {
    await client.connect();
    console.log("DB Connected");
  } catch (e) {
    console.log("Error in connecting to DB", e);
    process.exit();
  }
};
