const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const cartRoutes = require("./routes/cartRoutes");
const practiceRoutes = require("./routes/problemRoutes");
const user = require("./routes/userRouter");
const dashboard = require("./routes/dashboardRouter");
const profile = require("./routes/profileRouter");
const payment = require("./routes/paymentRouters");

const app = express();

connectDB();

app.use(cors());
// app.use(cors({ origin: 'https://testify-uanx.onrender.com/' }));
app.use(express.json());

// Routes
app.use("/courses", courseRoutes);
app.use("/cart", cartRoutes);
app.use("/practice", practiceRoutes); 
app.use("/user",user);
app.use("/dashboard",dashboard);
app.use("/profile",profile);
app.use("/payment",payment);

// Serve static files from the 'assets' directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

module.exports = app;
 
