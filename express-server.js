import express from "express";
import studentsRouter from "./routes/students.js";
import teachersRouter from "./routes/teachers.js";
import moviesRouter from "./routes/movies.js";
import theaterRouter from "./routes/theaters.js";

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

const PORT = 4500;

server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
