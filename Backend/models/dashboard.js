const mongoose = require("mongoose");

// Schema for user-specific problem statuses
const userProblemStatusSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problem_number: { type: Number, required: true },
  status: { type: String, required: true, default: 'unsolved' }, // Default status as 'unsolved'
  solved_date: { type: Date }, // Track when the problem was solved
});
// Schema for user statistics
const userStatisticsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_problems: { type: Number, default: 0 },
  easy_count: { type: Number, default: 1 },
  medium_count: { type: Number, default: 1 },
  hard_count: { type: Number, default: 1 },
  problems_solved_today: { type: Number, default: 0 },
  last_updated: { type: Date, default: Date.now },
  solved_dates: [{ type: Date }]
});

// Export the models
const UserProblemStatus = mongoose.model("UserProblemStatus", userProblemStatusSchema);
const UserStatistics = mongoose.model("UserStatistics", userStatisticsSchema);

module.exports = {
  UserProblemStatus,
  UserStatistics
};
