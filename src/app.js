const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Auth route
app.use("/api/auth", require("./routes/authRoutes"));

// Friend request route
app.use("/api/friends", require("./routes/friendRoutes"));


module.exports = app;
