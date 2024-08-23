const mongoose = require("mongoose");

// Define the problem schema with a reference to the User model
const problemSchema = new mongoose.Schema({
  problem_number: { type: Number, required: true },
  problem_link: { type: String, required: true },
  problem_name: { type: String, required: true },
  platform: { type: String, required: true },
  status: { type: String, default: "unsolved" }, // Default status for new problems
  difficulty: { type: String, required: true }, // e.g., 'easy', 'medium', 'hard'
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
