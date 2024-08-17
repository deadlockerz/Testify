const express = require("express");
const Problem = require("../models/problem");
const router = express.Router();

// Add a new problem (admin only)
router.post("/add-problem", async (req, res) => {
  try {
    const { problem_number, problem_link, problem_name, platform, difficulty } = req.body;
    if (!problem_number || !problem_link || !problem_name || !platform || !difficulty) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const problem = new Problem({ problem_number, problem_link, problem_name, platform, difficulty });
    const addProblem = await problem.save();
    res.status(201).json(addProblem);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get all problems
router.get("/allProblems", async (req, res) => {
  try {
    const allProblems = await Problem.find({});
    res.status(200).json(allProblems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// total easy medium hard problem 
router.get('/statistics', async (req, res) => {
  try {
    // Fetch total number of problems
    const totalProblems = await Problem.countDocuments();

    // Fetch number of problems by difficulty
    const difficultyCounts = await Problem.aggregate([
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 }
        }
      }
    ]);

    // Create a result object
    const difficultyMap = difficultyCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json({
      total: totalProblems,
      easy: difficultyMap.easy || 0,
      medium: difficultyMap.medium || 0,
      hard: difficultyMap.hard || 0
    });
  } catch (error) {
    console.error("Error fetching problem statistics:", error);
    res.status(500).json({ error: "An error occurred while fetching statistics" });
  }
});


module.exports = router;
