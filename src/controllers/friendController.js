const User = require("../models/User");

// 1️⃣ Send friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { fromUserId, toUserId } = req.body;

    if (!fromUserId || !toUserId) {
      return res.status(400).json({ message: "fromUserId and toUserId are required" });
    }

    if (fromUserId === toUserId) {
      return res.status(400).json({ message: "Cannot send request to yourself" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) return res.status(404).json({ message: "Recipient user not found" });

    // Check if already friends or request pending
    const existingRequest = toUser.friendRequests.find(
      (req) => req.from.toString() === fromUserId
    );
    const alreadyFriend = toUser.friends.find(
      (f) => f.id.toString() === fromUserId
    );
    if (existingRequest) return res.status(400).json({ message: "Friend request already sent" });
    if (alreadyFriend) return res.status(400).json({ message: "User is already your friend" });

    // Add friend request
    toUser.friendRequests.push({ from: fromUserId });
    await toUser.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Send friend request error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ View incoming friend requests
exports.viewFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("friendRequests.from", "name email profileurl");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ friendRequests: user.friendRequests });
  } catch (error) {
    console.error("View friend requests error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 3️⃣ Respond to friend request (accept/reject)
exports.respondToFriendRequest = async (req, res) => {
  try {
    const { userId } = req.params; // user2
    const { fromUserId, action } = req.body; // action = "accepted" | "rejected"

    if (!fromUserId || !["accepted", "rejected"].includes(action)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findById(userId); // user2
    const fromUser = await User.findById(fromUserId); // user1

    if (!user || !fromUser) return res.status(404).json({ message: "User not found" });

    // Find friend request
    const requestIndex = user.friendRequests.findIndex(req => req.from.toString() === fromUserId);
    if (requestIndex === -1) return res.status(404).json({ message: "Friend request not found" });

    user.friendRequests[requestIndex].status = action;

    if (action === "accepted") {
      // Add to each other's friends list
      user.friends.push({
        id: fromUser._id,
        name: fromUser.name,
        profile: fromUser.profileurl,
        email: fromUser.email
      });
      fromUser.friends.push({
        id: user._id,
        name: user.name,
        profile: user.profileurl,
        email: user.email
      });
      await fromUser.save();
    }

    await user.save();

    res.status(200).json({ message: `Friend request ${action}` });
  } catch (error) {
    console.error("Respond friend request error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 4️⃣ Get user's friends list
exports.getFriendsList = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error("Get friends error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
