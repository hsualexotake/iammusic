const express = require("express");
const { getQueueByRoomId, addSong, incrementRequestCount } = require("../controllers/queueController");
const router = express.Router();

// Get queue for a specific room
router.get("/:roomId", getQueueByRoomId);

// Add a song to the queue
router.post("/", addSong);

// Increment the request count for a song
router.put("/:queueId", incrementRequestCount);

module.exports = router;
