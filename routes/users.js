// APIs related to Users
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../db-utils/db-connection.js";
import { v4 } from "uuid";
import { userModel } from "../db-utils/models.js";
import mongoose from "mongoose";
import { mailOptions, transporter } from "../utils/mail-utils.js";
import { createJwtToken } from "../utils/jwt-utils.js";

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
    const userObj = new userModel({
      ...userDetails,
    });
    await userObj.validate();
    bcrypt.hash(userDetails.password, 10, async (err, hash) => {
      try {
        userDetails.password = hash;
        await usersCollection.insertOne({
          ...userDetails,
          id: v4(),
          isVerified: false,
        });

        const token = createJwtToken({ email: userDetails.email }, "1d");

        const link = `${process.env.FE_URL}/verify-account?token=${token}`;

        await transporter.sendMail({
          ...mailOptions,
          to: userDetails.email,
          subject: `Welcome to the Application ${userDetails.name}`,
          text: `Hi ${userDetails.name}, \nThank You for Registering with Us. \nTo Verify You account Click ${link}`,
        });
        res.json({ msg: "User created Successfully" });
      } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
          res.status(400).json({ msg: e.message });
        } else {
          res.status(500).json({ msg: "Internal Server Error" });
        }
        console.log(e);
      }
    });
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

// Verify Account
usersRouter.get("/verify-account", (req, res) => {
  const { token } = req.query;

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "Link Seems To Be Expired, Please try again" });
    }
    const { email } = data;
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          isVerified: true,
        },
      }
    );
    res.json({ msg: "User verified successfully" });
  });
});

// User Login
usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersCollection.findOne({ email });

    if (user) {
      // user exists in DB
      // Verify the incoming pass with the DB password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Something went wrong" });
        } else if (result) {
          delete user.password;
          res.json({ msg: "User Logged In Successfully", user });
        } else {
          res.status(400).json({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.status(404).json({ msg: "User Not Found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default usersRouter;
