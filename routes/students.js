// All the APIs for students will be here

import express from "express";
import { v4 } from "uuid";

const studentsRouter = express.Router();

const students = [];
// APIs for Students
// GET - /students
studentsRouter.get("/", (req, res) => {
  // send all the student details
  res.json(students);
});

// POST - /students -> Data: name, dob, batch, email
studentsRouter.post("/", (req, res) => {
  const stuData = req.body;

  students.push({
    id: v4(),
    ...stuData,
  });

  res.status(201).json({ msg: "student created successfully" });
});

// GET - /students/student-id
studentsRouter.get("/:id", (req, res) => {
  const studentId = req.params.id;
  res.json(students.find((stu) => stu.id === studentId));
});

export default studentsRouter;
