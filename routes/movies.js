import express from "express";

import { movies, theaters } from "./local-memory-db.js";
import { v4 } from "uuid";

const moviesRouter = express.Router();

// Get all movies
moviesRouter.get("/", (req, res) => {
  res.json(movies);
});

// Create a new movie
moviesRouter.post("/", (req, res) => {
  const movieData = req.body;

  movies.push({
    id: v4(),
    ...movieData,
  });

  res.status(201).json({ msg: "Movie Created Successfully" });
});

// Get a single movie
moviesRouter.get("/:id", (req, res) => {
  const movieId = req.params.id;

  const movie = movies.find((m) => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    // movie not found
    res.status(404).json({ msg: "Movie Not Found" });
  }
});

// Get all theaters for a particular movie
moviesRouter.get("/:id/theaters", (req, res) => {
  const id = req.params.id;

  const movieTheaters = [];

  // iterating over theaters to check if this movie is running
  theaters.forEach((t) => {
    const movieShow = t.shows.find((s) => s.movieId === id);

    if (movieShow) {
      movieTheaters.push({
        name: t.name,
        id: t.id,
      });
    }
  });

  res.json(movieTheaters);
});

export default moviesRouter;
