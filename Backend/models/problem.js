const mongoose = require("mongoose");

// Define the problem schema
const problemSchema = new mongoose.Schema({
  problem_number: { type: Number, required: true },
  problem_link: { type: String, required: true },
  problem_name: { type: String, required: true },
  platform: { type: String, required: true },
  status: { type: String, default: "unsolved" }, // Default status for new problems
  difficulty: { type: String, required: true }, // e.g., 'easy', 'medium', 'hard'
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
});

// Middleware to auto-increment the problem_number
problemSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      // Find the highest problem_number in the collection
      const lastProblem = await mongoose
        .model("Problem")
        .findOne({}, { problem_number: 1 })
        .sort({ problem_number: -1 });

      // Increment problem_number
      this.problem_number = lastProblem ? lastProblem.problem_number + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
