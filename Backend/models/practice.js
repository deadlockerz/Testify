const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
//   id: Number,
  problem_number: Number,
  problem_link: String,
  problem_name: String,
  platform: String,
  status: String,
  difficulty: String
});

const practice = mongoose.model("practice", practiceSchema);

module.exports = practice;
