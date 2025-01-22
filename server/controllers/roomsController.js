const pool = require("../db");

// Create a new room
const createRoom = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO rooms (room_name) VALUES ($1) RETURNING *",
      [`Room ${Date.now()}`] // Automatically generate a room name
    );
    res.status(201).json(result.rows[0]); // Return the created room details
  } catch (err) {
    res.status(500).json({ error: "Failed to create room" });
  }
};

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms");
    res.status(200).json(result.rows); // Return all rooms
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};
const incrementRequestCount = async (req, res) => {
  const { roomId, queueId } = req.params;

  try {
    const result = await pool.query(
      "UPDATE queue SET request_count = request_count + 1 WHERE room_id = $1 AND queue_id = $2 RETURNING *",
      [roomId, queueId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Song not found in the queue" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to upvote song" });
  }
};

// Get a specific room by ID
const getRoomById = async (req, res) => {
  const { id } = req.params; // Extract room ID from the route parameters
  try {
    const result = await pool.query("SELECT * FROM rooms WHERE room_id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Room not found" }); // Return 404 if no room is found
    }
    res.status(200).json(result.rows[0]); // Return the room details
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

// Get the queue for a specific room
const getRoomQueue = async (req, res) => {
  const { roomId } = req.params; // Extract room ID from the route parameters

  try {
    const result = await pool.query("SELECT * FROM queue WHERE room_id = $1", [
      roomId,
    ]);
    res.status(200).json(result.rows); // Return the queue for the room
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the queue for the room." });
  }
};

// Add a song to the queue for a specific room
const addSongToQueue = async (req, res) => {
  const { roomId } = req.params;
  const { song_name } = req.body;

  if (!song_name) {
    return res.status(400).json({ error: "Song name is required." });
  }

  try {
    // Check if the song already exists in the queue
    const existingSong = await pool.query(
      "SELECT * FROM queue WHERE room_id = $1 AND song_name = $2",
      [roomId, song_name]
    );

    if (existingSong.rows.length > 0) {
      // Increment the request count if the song exists
      await pool.query(
        "UPDATE queue SET request_count = request_count + 1 WHERE room_id = $1 AND song_name = $2",
        [roomId, song_name]
      );
    } else {
      // Add the song to the queue if it doesn't exist
      await pool.query(
        "INSERT INTO queue (room_id, song_name, request_count) VALUES ($1, $2, 1)",
        [roomId, song_name]
      );
    }

    res.status(201).json({ message: "Song added to the queue." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add the song to the queue." });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  getRoomQueue,
  addSongToQueue,
  incrementRequestCount,
};
