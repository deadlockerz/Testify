const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const saltRounds = 10;


router.post("/signup", async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
      if (existingUser) {
        return res.status(400).send("User with this email or phone already exists");
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new User({ name, email, phone, password: hashedPassword });
      const userData = await user.save();
      res.status(201).send(userData);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  // User login route
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).send("User not found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send("Invalid password");
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3000s' });
      res.json({ token,user });
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  dotenv.config();

module.exports = router;
