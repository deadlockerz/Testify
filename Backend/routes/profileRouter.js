const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/user");

// Serve static files from the 'uploads' directory
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to update user profile photo
router.put(
  "/updateprofile/:id/photo",
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const userId = req.params.id;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Find the user and get the current profile photo path
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

    // Delete the old profile photo file if it exists
    if (user.profilePhoto) {
        const photoPath = path.basename(user.profilePhoto);
        const defaultPhotoPath = "default.png";
      
        // Check if the photo path is not the default photo path
        if (photoPath !== defaultPhotoPath) {
          const oldFilePath = path.join(__dirname, "../uploads", photoPath);
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error("Error deleting old profile photo:", err);
            }
          });
        }
      }

      // Construct the URL for the new profile photo
      const profilePhotoUrl = `/profile/uploads/${req.file.filename}`;

      // Update user profile with new photo URL
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePhoto: profilePhotoUrl },
        { new: true }
      );

      res.json({ profilePhoto: profilePhotoUrl });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// Route to get user details by ID
router.get("/userprofile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Route to update user details
router.put("/updateprofile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body; // Contains the details to update

    // Validate that at least one field is provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Find user and update
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
