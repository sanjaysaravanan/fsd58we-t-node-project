import express from "express";
import mongoose from "mongoose";

// import model for the posts
import { postModel } from "../db-utils/models.js";
import { v4 } from "uuid";
//import { insertPost } from "./posts-logic.js";

const postsRouter = express.Router();

// get all the posts
postsRouter.get("/", async (req, res) => {
  // get the posts from DB using postmodel
  const posts = await postModel.find({});

  res.json(posts);
});

// Create a new post
postsRouter.post("/", async (req, res) => {
  const postDetail = req.body;

  // validate & insert the new record into DB
  const postObj = new postModel({
    ...postDetail,
    like: 0,
    id: v4(),
  });
  try {
    // below line will validate & insert into the DB
    await postObj.save(); // for new insertion

    res.json({ msg: "Post Created SUccessfully" });
  } catch (e) {
    console.log("Error in creating Post", e);
    if (e instanceof mongoose.Error.ValidationError) {
      res
        .status(400)
        .json({ msg: "Please Check the fields for Post Creation" });
    } else res.status(500).json({ msg: "Internal Server Error" });
  }

  /* const result = await insertPost(postDetail);

  res.status(result.code).json({ ...result }); */
});

export default postsRouter;
