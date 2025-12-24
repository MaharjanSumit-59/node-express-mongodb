const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("../controllers/userController");

// POST request: create user
router.post("/", createUser);

// GET request: fetch all users
router.get("/", getUsers);

module.exports = router;
