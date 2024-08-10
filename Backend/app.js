const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const cartRoutes = require("./routes/cartRoutes");
const practiceRoutes = require("./routes/practiceRoutes");
const user = require("./routes/user");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/courses", courseRoutes);
app.use("/cart", cartRoutes);
app.use("/practice", practiceRoutes);
app.use("/user",user);

// Serve static files from the 'assets' directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

module.exports = app;
