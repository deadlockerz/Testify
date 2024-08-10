const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
  problem_number: { type: Number, required: true },
  problem_link: { type: String, required: true },
  problem_name: { type: String, required: true },
  platform: { type: String, required: true },
  status: { type: String, required: true },
  difficulty: { type: String, required: true },
});

const Practice = mongoose.model("Practice", practiceSchema);
module.exports = Practice;
