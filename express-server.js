import express from "express";
import studentsRouter from "./routes/students.js";
import teachersRouter from "./routes/teachers.js";
import moviesRouter from "./routes/movies.js";
import theaterRouter from "./routes/theaters.js";
import { connectToDb } from "./db-utils/db-connection.js";
import usersRouter from "./routes/users.js";
import { connectViaMongoose } from "./db-utils/mongoose-connection.js";
import postsRouter from "./routes/posts.js";

const server = express();

// Middleware used by server to read the body of a request
server.use(express.json());

// GET
server.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

// POST
server.post("/", (req, res) => {
  console.log("Incoming Data/Body", req.body);

  res.status(201).json({ msg: "created something successfully" });
});

// link the studentRouter with express server
server.use("/students", studentsRouter);
server.use("/teachers", teachersRouter);
server.use("/movies", moviesRouter);
server.use("/theaters", theaterRouter);
server.use("/users", usersRouter);
server.use("/posts", postsRouter);

const PORT = 4500;

// Connect to DB then start the server
// Method 1 promise.then
/* connectToDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server listening on ", PORT);
    });
  })
  .catch((e) => {
    console.log("Error in Connecting to DB", e);
  }); */

// Method Top Level Module await
await connectToDb(); // this line will wait and connect to DB then next lines will executed
await connectViaMongoose();

server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
