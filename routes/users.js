// APIs related to Users
import express from "express";

import { db } from "../db-utils/db-connection.js";
import { v4 } from "uuid";

const usersRouter = express.Router();

const usersCollection = db.collection("users");

// Get all users
usersRouter.get("/", async (req, res) => {
  // Get all users using the same collection

  const usersData = await usersCollection
    .find({}, { projection: { _id: 0 } })
    .toArray();

  res.json(usersData);
});

usersRouter.post("/", async (req, res) => {
  const userDetails = req.body;

  // check if the user exists
  const user = await usersCollection.findOne({ email: userDetails.email });

  if (user) {
    res.status(409).json({ msg: "User Already Exists" });
  } else {
    await usersCollection.insertOne({
      ...userDetails,
      id: v4(),
    });

    res.json({ msg: "User created Successfully" });
  }
});

// Delete a user with id
usersRouter.delete("/", async (req, res) => {
  const { id } = req.query;

  // check if the user exists
  const user = await usersCollection.findOne({ id });

  if (user) {
    await usersCollection.deleteOne({ id });

    res.json({ msg: "User Deleted Successfully" });
  } else {
    res.status(404).json({ msg: "User not Found" });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateDetails = req.body;

  const user = await usersCollection.findOne({ id });

  // check if the user exists
  if (user) {
    // Updation logic

    await usersCollection.updateOne(
      { id },
      {
        $set: {
          ...updateDetails,
        },
      }
    );

    res.json({ msg: "User Updated Successfully" });
  } else {
    res.status(404).json({ msg: "user not found" });
  }
});

export default usersRouter;
