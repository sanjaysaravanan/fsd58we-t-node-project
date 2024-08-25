// all the apis for teachers will be here
import express from "express";
import { v4 } from "uuid";

const teachersRouter = express.Router();

const teachers = [];
// APIs for Students
// GET - /teachers
teachersRouter.get("/teachers", (req, res) => {
  // send all the teachers details
  res.json(teachers);
});

// POST - /teachers -> Data: name, dob, batch, email
teachersRouter.post("/teachers", (req, res) => {
  const tData = req.body;

  students.push({
    id: v4(),
    ...tData,
  });

  res.status(201).json({ msg: "student created successfully" });
});

// GET - /teachers/teacher-id
teachersRouter.get("/teachers/:id", (req, res) => {
  const tId = req.params.id;
  res.json(teachers.find((t) => t.id === tId));
});

export default teachersRouter;
