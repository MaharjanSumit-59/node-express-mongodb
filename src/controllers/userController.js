const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log("User created:", user); // ✅ Add this log
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // ✅ Check errors here
    res.status(400).json({ message: error.message });
  }
};
