const express = require("express");
const Course = require("../models/course");
const CourseDetail = require("../models/courseDetail");
const router = express.Router();

// add new course
router.post("/add-course", async (req, res) => {
  try {
    const { img, course_name, course_disc, course_price } = req.body;
    const course = new Course({ img, course_name, course_disc, course_price });
    const addcourse = await course.save();
    res.status(201).send(addcourse); 
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// updare a course
router.put("/updatecourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send(course);
  } catch (e) {
    res.send(e);
  }
});

// delete specific course
router.delete("/deletecourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndDelete({ _id: id });
    res.send(course);
  } catch (e) {
    res.send(e);
  }
});

// show all course
router.get("/readallcourses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).send("An error occurred while fetching courses");
  }
});

// show a specific course

router.get('/course-detail/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
