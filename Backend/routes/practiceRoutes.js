const express = require("express");
const Practice = require("../models/practice");
const router = express.Router();

// Add a new problem
router.post("/add-problem", async (req, res) => {
  try {
    const { problem_number, problem_link, problem_name, platform, status, difficulty } = req.body;
    if (!problem_number || !problem_link || !problem_name || !platform || !status || !difficulty) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const practice = new Practice({ problem_number, problem_link, problem_name, platform, status, difficulty });
    const addProblem = await practice.save();
    res.status(201).json(addProblem);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get all problems
router.get("/readallproblems", async (req, res) => {
  try {
    const problems = await Practice.find({});
    res.send(problems);
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).send("An error occurred while fetching problems");
  }
});

module.exports = router;
