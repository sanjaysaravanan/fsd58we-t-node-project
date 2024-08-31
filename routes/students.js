// All the APIs for students will be here

import express from "express";
import { v4 } from "uuid";

const studentsRouter = express.Router();

// store all the students here
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
  console.log(req.params);
  const studentId = req.params.id;
  const student = students.find((stu) => stu.id === studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ msg: "Student not found" });
  }
});

// DELETE a student
studentsRouter.delete("/", (req, res) => {
  console.log(req.query);
  const { id } = req.query;
  const studentIndex = students.findIndex((stu) => stu.id === id);

  if (studentIndex !== -1) {
    // delete Logic
    students.splice(studentIndex, 1);
    res.json({ msg: "Student Deleted Successfully" });
  } else {
    res.status(404).json({ msg: "Student Not Found" });
  }
});

// Edit a single student
studentsRouter.put("/:id", (req, res) => {
  const updateData = req.body;
  const { id } = req.params;

  const studentIndex = students.findIndex((stu) => stu.id === id);

  if (studentIndex === -1) {
    res.status(404).json({ msg: "Student Not Found" });
  } else {
    students[studentIndex] = {
      id,
      ...updateData,
    };

    res.json({ msg: "updated student details successfully" });
  }
});

export default studentsRouter;
