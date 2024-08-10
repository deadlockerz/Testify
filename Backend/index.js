// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const { Schema, model } = require("mongoose");
// const CourseDetail = require("./models/courseDetail");
// const User = require("./models/user");
// const Course = require("./models/course");
// const Practice = require("./models/practice");
// const { StringDecoder } = require("string_decoder");
// // const bcrypt = require("bcrypt");

// const PORT = 3030;
// const app = express();
// app.use(cors());
// app.use(express.json());

// //connect to mongo
// mongoose
//   .connect("mongodb://127.0.0.1:27017/testify")
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((e) => {
//     console.error("MongoDB connection error:", e);
//   });

// //create course schema
// const courseSchema = new mongoose.Schema({
//   img: { type: String },
//   course_name: { type: String, required: true },
//   course_disc: { type: String, required: true },
//   course_price: { type: Number, required: true },
// });

// //cart Schema
// const cartSchema = new mongoose.Schema({
//   courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
//   quantity: { type: Number, default: 1 },
// });

// //practice Sechema
// const practiceSchema = new mongoose.Schema({
//   problem_number: { type: Number, required: true },
//   problem_link: { type: String, required: true },
//   problem_name: { type: String, required: true },
//   platform: { type: String, required: true },
//   status: { type: String, required: true },
//   difficulty : { type: String, required: true },
// })

// //create cart module
// const Cart = mongoose.model("Cart", cartSchema); // not require to create cart model

// //course
// app.post("/add-course", async (req, res) => {
//   try {
//     const { img, course_name, course_disc, course_price } = req.body;
//     const course = new Course({ img, course_name, course_disc, course_price });
//     const addcourse = await course.save();
//     res.status(201).send(addcourse);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

// //update a course
// app.put("/updatecourse/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const course = await Course.findByIdAndUpdate({ _id: id }, req.body, {
//       new: true,
//     });
//     res.send(course);
//   } catch (e) {
//     res.send(e);
//   }
// });

// // delete course
// app.delete("/deletecourse/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const course = await Course.findByIdAndDelete({ _id: id });
//     res.send(course);
//   } catch (e) {
//     res.send(e);
//   }
// });

// // show courser
// app.get("/readallcourses", async (req, res) => {
//   try {
//     const courses = await Course.find({});
//     res.send(courses);
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     res.status(500).send("An error occurred while fetching courses");
//   }
// });

// // Define route for fetching course details
// app.get("/course-detail/:id", async (req, res) => {
//   try {
//     const courseId = req.params.id;
//     // Find the course detail by courseId
//     const courseDetail = await CourseDetail.findOne({ courseId });
//     if (!courseDetail) {
//       return res.status(404).send("Course detail not found");
//     }
//     res.send(courseDetail);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });
// //////////////////////////////////////////////////////CART//////////////////////////////////////////////////////////////////////////////////////////
// //add to cart
// app.post("/cart/:courseId", async (req, res) => {
//   const { courseId } = req.params;
//   try {
//     const existingCartItem = await Cart.findOne({ courseId });
//     if (existingCartItem) {
//       // Course already exists in the cart
//       return res.status(400).send({ message: "Course already in cart" });
//     }

//     const cartItem = new Cart({ courseId });
//     const addedItem = await cartItem.save();
//     res.status(201).send(addedItem);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// // show cart item
// app.get("/showcartitem", async (req, res) => {
//   try {
//     const cartItems = await Cart.find({}).populate("courseId");
//     res.status(200).send(cartItems);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // remove from cart
// app.delete("/removefromcart/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Cart.findByIdAndDelete(id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// ////////////////////////////////////////////////////////////////PRACTICE//////////////////////////////////////////////////////////////////////////
// //add problem

// app.post("/add-problem", async (req, res) => {
//   try {
//     const { problem_number, problem_link, problem_name, platform, status, difficulty } = req.body;
    
//     // Validate input data (this is a basic example, you can use a library like Joi for more complex validation)
//     if (!problem_number || !problem_link || !problem_name || !platform || !status || !difficulty) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Create a new instance of the Practice model
//     const practice = new Practice({ problem_number, problem_link, problem_name, platform, status, difficulty });

//     // Save the new problem to the database
//     const addProblem = await practice.save();

//     // Send the newly added problem as the response
//     res.status(201).json(addProblem);
//   } catch (e) {
//     // Handle any errors that occur
//     res.status(400).json({ error: e.message });
//   }
// });

// // show all problems 
// app.get("/readallproblems", async (req, res) => {
//   try {
//     const problem = await Practice.find({});
//     res.send(problem);
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     res.status(500).send("An error occurred while fetching courses");
//   }
// });

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Serve static files from the 'assets' directory
// app.use("/assets", express.static(path.join(__dirname, "assets")));

// //start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




const app = require("./app");
const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
