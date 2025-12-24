const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../controllers/authController");

// POST /api/auth
router.post("/", authenticateUser);

module.exports = router;
