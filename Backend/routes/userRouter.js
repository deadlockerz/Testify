const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const twilio = require("twilio");

dotenv.config(); // Load environment variables

const saltRounds = 10;

// signup

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(401)
        .send("User with this email or phone already exists");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, phone, password: hashedPassword });
    const userData = await user.save();
    res.status(201).send(userData);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3000s",
    });
    res.json({ user, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Google Login
router.post("/google-login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404);
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3000s",
    });
    res.json({ user, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//Google Signup
router.post("/google-signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, password: hashedPassword });
    const userData = await user.save();
    const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, {
      expiresIn: "3000s",
    });
    res.json({ userData, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// fetch all users
router.get("/fetchallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).send("An error occurred while fetching courses");
  }
});

// forgot password

router.post("/forgot-password", async (req, res) => {
  const email = req.body.email;
  try {
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      return res.json({ status: "Email does not exist" });
    }
    const key = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, key, {
      expiresIn: "300s",
    });
    const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
    await sendEmail(email, link);
    res.send(link);
  } catch (e) {
    res.status(422).send(e.message);
  }
});

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (email, link) => {
  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Reset password",
    text: `Click to change your password ${link}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// send email

router.post("/email/sendEmail", async (req, res) => {
  const { email, link } = req.body;
  await sendEmail(email, link);
  res.send("Email sent successfully!");
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }

  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.status(201).send({ status: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Invalid or expired token" });
  }
});

// send otp by email
router.post("/sendotp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await sendOtp(email, otp);
    res.json({ success: true, otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send OTP. Please try again later.",
      });
  }
});

// Function to send OTP via email
const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your one-time password (OTP) for Testify is ${otp}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email.");
  }
};

// Send OTP

// const client = twilio(process.env.SMS_SID, process.env.SMS_TOKEN);

// router.post('/sendotp', (req, res) => {
//   const { phoneNumber } = req.body;

//   // Validate phone number (basic validation)
//   if (!/^\d{10}$/.test(phoneNumber)) {
//     return res.status(400).json({ success: false, error: 'Invalid phone number format. Please enter a 10-digit phone number without country code.' });
//   }

//   // Generate OTP securely
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   client.messages
//     .create({
//       from: process.env.SMS_NUMBER,
//       body: `Your OTP is: ${otp}`,
//       to: `+91${phoneNumber}`, // Adjust if you are using a different country code
//     })
//     .then(() => {
//       res.json({ success: true, otp });
//     })
//     .catch((error) => {
//       console.error('Error sending OTP:', error);
//       res.status(500).json({ success: false, error: 'Failed to send OTP. Please try again later.' });
//     });
// });

// jwt verify function

// function to verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(403).json({ message: "Token is not valid" });
  }
}

// Verify JWT token and return user ID
router.get("/verify-token", verifyToken, (req, res) => {
  try {
    const token = req.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
