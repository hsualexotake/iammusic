const pool = require("../db");

// Get all rooms
const getAllRooms = async () => {
  const result = await pool.query("SELECT * FROM rooms");
  return result.rows;
};

// Get a single room by ID
const getRoomById = async (roomId) => {
  const result = await pool.query("SELECT * FROM rooms WHERE room_id = $1", [
    roomId,
  ]);
  return result.rows[0];
};

// Create a new room
const createRoom = async (roomName) => {
  const result = await pool.query(
    "INSERT INTO rooms (room_name) VALUES ($1) RETURNING *",
    [roomName]
  );
  return result.rows[0];
};

// Delete a room by ID
const deleteRoom = async (roomId) => {
  await pool.query("DELETE FROM rooms WHERE room_id = $1", [roomId]);
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  deleteRoom,
};
