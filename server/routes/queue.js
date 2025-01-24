const express = require("express");
const {
  getQueueByRoomId,
  addSong,
  incrementRequestCount,
  decrementRequestCount,
} = require("../controllers/queueController");
const router = express.Router();

// Get queue for a specific room
router.get("/:roomId", getQueueByRoomId);

// Add a song to the queue
router.post("/", addSong);

// Increment the request count for a song
router.put("/:queueId", incrementRequestCount);

router.put("/:queueId/decrement", decrementRequestCount);

module.exports = router;
