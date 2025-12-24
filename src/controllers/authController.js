const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Secret key for JWT (in .env)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// User login / register & check profile
exports.authenticateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // New user - create incomplete profile
      user = await User.create({
        name,
        email,
        description: "",
        profileurl: "",
        skills: [],
        isProfileComplete: false
      });
      return res.status(400).json({
        message: "Profile incomplete. Please complete your profile.",
        userId: user._id
      });
    }

    // Existing user
    if (!user.isProfileComplete) {
      return res.status(400).json({
        message: "Profile incomplete. Please complete your profile.",
        userId: user._id
      });
    }

    // Profile complete → generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Authentication successful",
      token,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
