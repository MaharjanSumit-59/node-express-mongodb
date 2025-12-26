const express = require("express");
const router = express.Router();
const {
  sendFriendRequest,
  viewFriendRequests,
  respondToFriendRequest,
  getFriendsList
} = require("../controllers/friendController");

// Send request
router.post("/request", sendFriendRequest);

// View incoming requests
router.get("/requests/:userId", viewFriendRequests);

// Respond to request
router.put("/respond/:userId", respondToFriendRequest);

// Get friend list
router.get("/list/:userId", getFriendsList);

module.exports = router;
