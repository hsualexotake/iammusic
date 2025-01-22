const pool = require("../db");

// Get queue for a specific room
const getQueueByRoomId = async (req, res) => {
  const { roomId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM queue WHERE room_id = $1", [roomId]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch queue" });
  }
};

// Add a song to the queue
const addSong = async (req, res) => {
  const { song_name, room_id } = req.body;
  try {
    const existingSong = await pool.query(
      "SELECT * FROM queue WHERE song_name = $1 AND room_id = $2",
      [song_name, room_id]
    );

    if (existingSong.rows.length > 0) {
      // Increment request count if song already exists
      const updatedSong = await pool.query(
        "UPDATE queue SET request_count = request_count + 1 WHERE song_name = $1 AND room_id = $2 RETURNING *",
        [song_name, room_id]
      );
      return res.status(200).json(updatedSong.rows[0]);
    }

    const result = await pool.query(
      "INSERT INTO queue (song_name, room_id, request_count) VALUES ($1, $2, $3) RETURNING *",
      [song_name, room_id, 1]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add song to queue" });
  }
};

// Increment request count for a specific song
const incrementRequestCount = async (req, res) => {
  const { queueId } = req.params;
  try {
    const result = await pool.query(
      "UPDATE queue SET request_count = request_count + 1 WHERE queue_id = $1 RETURNING *",
      [queueId]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to increment request count" });
  }
};

module.exports = { getQueueByRoomId, addSong, incrementRequestCount };
