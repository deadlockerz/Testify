const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");


const saltRounds = 10;

// user signup route
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
  // dotenv.config();

// user forgot password 
router.post('/forgot-password' , async(req,res) =>{
  const email = req.body.email ;
   try{
     const olduser = await User.findOne({email : email})
     if(!olduser){
       return res.json({status : "Email does not exist"})
     }
     const key = process.env.JWT_SECRET + olduser.password;
     const token = jwt.sign({ email: olduser.email,id: olduser._id }, key , { expiresIn: '3000s' });
     const link =`http://localhost:3000/reset-password/${olduser._id}/${token}`;
     await sendEmail(email, link);
     res.send(link)
   }catch(e){
      res.status(422).send(e.message)
   }
})
//email otp validation 
dotenv.config();
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

router.post("/email/sendEmail", async (req, res) => {
  const { email, link } = req.body;
  await sendEmail(email, link);
  res.send("Email sent successfully!");
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});


// Reset Password 
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
    const saltRounds = 10; // Specify the number of salt rounds
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

// Token verification 
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      req.token = token;
      next();
  } else {
      res.status(403).send({
          result: "Token is not valid"
      });
  }
}


module.exports = router;
