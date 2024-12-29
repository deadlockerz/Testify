

const mongoose = require("mongoose");

const courseDetailSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  // Add other fields related to course details here
});

const CourseDetail = mongoose.model("CourseDetail", courseDetailSchema);
module.exports = CourseDetail;
