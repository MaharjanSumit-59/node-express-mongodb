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

module.exports = app;
