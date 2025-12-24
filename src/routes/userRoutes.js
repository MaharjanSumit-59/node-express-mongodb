const express = require("express");
const router = express.Router();
const { createUser, getUsers, completeUserProfile } = require("../controllers/userController");

// POST request: create user
router.post("/", createUser);

// GET request: fetch all users
router.get("/", getUsers);

// NEW: complete profile route
router.put("/:id/complete-profile", completeUserProfile);


module.exports = router;
