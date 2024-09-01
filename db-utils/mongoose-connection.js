import mongoose from "mongoose";

const host = "127.0.0.1:27017"; // 'localhost:27017'
const dbName = "fsd58we-tamil-test";

// Local URL
const localDbUrl = `mongodb://${host}/${dbName}`;

// Cloud URL
const cloudDbUrl = `mongodb+srv://sanjaysaravanan1997:sopupn14jDK7EmQt@cluster0.nwegh.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

export const connectViaMongoose = async () => {
  try {
    await mongoose.connect(cloudDbUrl);
    console.log("Connected to DB  Via Mongoose");
  } catch (e) {
    console.log("Error in connecting to DB", e);
    process.exit(1);
  }
};
