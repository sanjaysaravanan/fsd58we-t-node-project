// Mongoose Models used in the application
import { model, Schema } from "mongoose";

const postSchema = new Schema({
  id: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
  caption: {
    type: "string",
    required: true,
  },
  userId: {
    type: "string",
    required: true,
  },
  like: {
    type: "number",
    required: true,
  },
});

export const postModel = new model("post", postSchema, "posts");

// No/Empty Scheme --> No validation
export const userModel = new model("user", new Schema(), "users");
