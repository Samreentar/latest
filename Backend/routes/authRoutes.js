const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user exists with the correct role
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials or role mismatch!" });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the response with token
    res.status(200).json({
      message: "Login successful",
      token,
      userType: user.role, // Send the role so frontend can handle redirects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
