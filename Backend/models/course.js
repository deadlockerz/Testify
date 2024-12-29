// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   id: Number,
//   img: String,
//   course_name: String,
//   course_disc: String,
//   course_price: String,
// });

// const Course = mongoose.model("Course", courseSchema);

// module.exports = Course;

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  img: { type: String },
  course_name: { type: String, required: true },
  course_disc: { type: String, required: true },
  course_price: { type: Number, required: true },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
