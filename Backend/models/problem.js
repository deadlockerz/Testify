const mongoose = require ("mongoose");

const problemSchema = new mongoose.Schema({
  problem_number: { type: Number, required: true },
  problem_link: { type: String, required: true },
  problem_name: { type: String, required: true },
  platform: { type: String, required: true },
  status: { type: String, default: "unsolved" }, // Default status for new problems
  difficulty: { type: String, required: true }, // e.g., 'easy', 'medium', 'hard'
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
