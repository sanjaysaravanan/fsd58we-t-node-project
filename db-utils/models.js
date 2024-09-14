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
  /* students: {
    type: Array,
    default: [],
  }, */
});

export const postModel = new model("post", postSchema, "posts");

// No/Empty Scheme --> No validation

const userScheme = new Schema({
  password: {
    type: "string",
    minLength: [6, "Should be 6 characters in length"],
    maxLength: 12,
    required: true,
  },
});

export const userModel = new model("user", userScheme, "users");
