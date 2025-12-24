const User = require("../models/User");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, description, profileurl, skills, friends, isPremiumUser } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Determine if profile is complete
    const isProfileComplete =
      description && description.trim() !== "" &&
      profileurl && profileurl.trim() !== "" &&
      Array.isArray(skills) && skills.length > 0;

    const user = await User.create({
      name,
      email,
      description: description || "",
      profileurl: profileurl || "",
      skills: skills || [],
      friends: friends || [],
      isProfileComplete,
      isPremiumUser: isPremiumUser || false
    });

    console.log("User created:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Fetch all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all documents
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Complete user profile
exports.completeUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, profileurl, skills, friends } = req.body;

    // Validate required fields
    if (
      !description ||
      !profileurl ||
      !Array.isArray(skills) ||
      skills.length === 0
    ) {
      return res.status(400).json({
        message: "Description, profile URL and at least one skill are required"
      });
    }

    // Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update profile
    user.description = description;
    user.profileurl = profileurl;
    user.skills = skills;
    user.friends = friends || user.friends;
    user.isProfileComplete = true;

    await user.save();

    res.status(200).json({
      message: "Profile completed successfully",
      user
    });

  } catch (error) {
    console.error("Complete profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};