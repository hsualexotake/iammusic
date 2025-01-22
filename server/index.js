const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
const roomsRoutes = require("./routes/rooms");
const queueRoutes = require("./routes/queue"); // Import the queue routes
app.use("/rooms", roomsRoutes); // Use `/rooms` routes
app.use("/queue", queueRoutes); // Use `/queue` routes

// Serve React static files after API routes
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
