const express = require ("express");
const Problem = require("../models/problem");
const {UserProblemStatus, UserStatistics } = require("../models/dashboard");
const router = express.Router();


//fetch problem status
router.get('/status/:user_id/:problem_number', async (req, res) => {
  const { user_id, problem_number } = req.params;

  try {
    // Find the problem status for the given user and problem number
    let problemStatus = await UserProblemStatus.findOne({ user_id, problem_number });

    // If no record is found, create one with default status 'unsolved'
    if (!problemStatus) {
      problemStatus = new UserProblemStatus({
        user_id,
        problem_number,
        status: 'unsolved',
      });
      await problemStatus.save();
    }

    res.status(200).json(problemStatus);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching problem status' });
  }
});

// Update problem status
router.post("/updateProblemStatus", async (req, res) => {
  const { user_id, problem_number, status } = req.body;

  try {
    const problem = await Problem.findOne({ problem_number });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Update or create user problem status
    let userProblemStatus = await UserProblemStatus.findOne({ user_id, problem_number });
    if (!userProblemStatus) {
      userProblemStatus = new UserProblemStatus({ user_id, problem_number, status });
    } else {
      userProblemStatus.status = status;
      userProblemStatus.solved_date = status === "solved" ? new Date() : null;
    }
    await userProblemStatus.save();

    // Update user statistics
    let userStatistics = await UserStatistics.findOne({ user_id });
    if (!userStatistics) {
      userStatistics = new UserStatistics({ user_id });
    }

    const currentDate = new Date().setHours(0, 0, 0, 0);

    if (status === "solved") {
      userStatistics.total_problems += 1;
      userStatistics[`${problem.difficulty}_count`] += 1;
      userStatistics.problems_solved_today += 1;

      const todayIndex = userStatistics.solved_dates.findIndex(date => new Date(date).setHours(0, 0, 0, 0) === currentDate);
      if (todayIndex === -1) {
        userStatistics.solved_dates.push(new Date());
      }
    } else if (userStatistics.total_problems > 0) {
      userStatistics.total_problems -= 1;
      userStatistics[`${problem.difficulty}_count`] -= 1;
      userStatistics.problems_solved_today = Math.max(0, userStatistics.problems_solved_today - 1);
    }

    userStatistics.last_updated = new Date();
    await userStatistics.save();
    res.status(200).json({ message: "Problem status and user statistics updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user statistics for the last month
router.get("/statistics/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const userStatistics = await UserStatistics.findOne({ user_id });

    if (!userStatistics) {
      return res.status(404).json({ message: "User statistics not found" });
    }

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const solvedDates = userStatistics.solved_dates.filter(date => new Date(date) >= startDate);

    const dailySolvedCount = solvedDates.reduce((acc, date) => {
      const dateStr = new Date(date).toISOString().split('T')[0];
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      total_problems: userStatistics.total_problems,
      easy_count: userStatistics.easy_count,
      medium_count: userStatistics.medium_count,
      hard_count: userStatistics.hard_count,
      problems_solved_today: userStatistics.problems_solved_today,
      daily_solved_count: dailySolvedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
 