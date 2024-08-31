import express from "express";

import { theaters } from "./local-memory-db.js";
import { v4 } from "uuid";

const theaterRouter = express.Router();

// Get all theaters
theaterRouter.get("/", (req, res) => {
  res.json(theaters);
});

// Create a new movie
theaterRouter.post("/", (req, res) => {
  const theaterData = req.body;

  theaters.push({
    id: v4(),
    ...theaterData,
    shows: [],
  });

  res.status(201).json({ msg: "Theater Created Successfully" });
});

// Get a single movie
theaterRouter.get("/:id", (req, res) => {
  const theaterId = req.params.id;

  const theater = theaters.find((m) => m.id === theaterId);

  if (theater) {
    res.json(theater);
  } else {
    // theater not found
    res.status(404).json({ msg: "Theater Not Found" });
  }
});

// Get all show for a particular theater
theaterRouter.get("/:id/shows", (req, res) => {
  const { id } = req.params;

  const theater = theaters.find((t) => t.id === id);

  if (theater) {
    res.json(theater.shows);
  } else {
    res.status(404).json({ msg: "Theater Not Found" });
  }
});

// add show to an existing theater
theaterRouter.patch("/:id/add-show", (req, res) => {
  const { id } = req.params;

  const showDetails = req.body;

  const theaterIndex = theaters.findIndex((t) => t.id === id);

  if (theaterIndex !== -1) {
    theaters[theaterIndex].shows.push(showDetails);
    res.json({ msg: "show added successfully" });
  } else {
    res.status(404).json({ msg: "Theater Not Found" });
  }
});

export default theaterRouter;
