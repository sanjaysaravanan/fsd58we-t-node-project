import mongodb from "mongodb";

// local DB
const localDbUrl = "127.0.0.1:27017"; // 'localhost:27017'
const dbName = "fsd58we-tamil-test";

// cloud DB
const cloudUrl =
  "mongodb+srv://sanjaysaravanan1997:sopupn14jDK7EmQt@cluster0.nwegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Local DB Connection
// export const client = new mongodb.MongoClient(`mongodb://${localDbUrl}`);

export const client = new mongodb.MongoClient(cloudUrl);

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
