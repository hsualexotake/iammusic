const express = require("express");
const {
  createRoom,
  getRooms,
  getRoomById,
  getRoomQueue,
  addSongToQueue,
  incrementRequestCount,
} = require("../controllers/roomsController");
const router = express.Router();

// Create a new room
router.post("/", createRoom);

// Get all rooms
router.get("/", getRooms);

// Get a specific room by ID
router.get("/:id", getRoomById);

// Get the queue for a specific room
router.get("/:roomId/queue", getRoomQueue);

// Add a song to the queue for a specific room
router.post("/:roomId/queue", addSongToQueue);

router.put("/:roomId/queue/:queueId/upvote", incrementRequestCount);

module.exports = router;
