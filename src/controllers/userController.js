const User = require("../models/User");

// Create a new user (existing)
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const user = await User.create({ name, email });
    console.log("User created:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Fetch all users (new)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all documents
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: error.message });
  }
};
