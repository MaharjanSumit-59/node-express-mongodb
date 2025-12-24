const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
});

const friendSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  profile: { type: String },
  email: { type: String }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  profileurl: { type: String, required: true },
  skills: { type: [skillSchema], required: true },
  friends: { type: [friendSchema], default: [] },
  email: { type: String, required: true, unique: true },
  isProfileComplete: { type: Boolean, default: false },
  isPremiumUser: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
