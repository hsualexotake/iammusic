import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // Join an existing room
  const handleJoinRoom = () => {
    if (roomNumber.trim()) {
      navigate(`/room/${roomNumber}`);
    } else {
      setError("Room number cannot be empty.");
    }
  };

  // Create a new room and navigate to it
  const handleCreateRoom = async () => {
    try {
      const response = await fetch("http://localhost:8080/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create a room.");
      }

      const data = await response.json();
      setSuccessMessage(`Room ${data.room_id} created successfully!`);
      setError(null);

      // Navigate to the newly created room
      navigate(`/room/${data.room_id}`);
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Welcome to Queue</h1>
      <p>How to use:</p>
      <div>
        <Link to="/todo" className="btn btn-primary m-2">
          Todo App
        </Link>
      </div>

      <div className="text-center mt-4">
        <h2>Create a New Room</h2>
        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <button className="btn btn-success" onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>

      <div className="mt-4">
        <h2>Join a Room</h2>
        <input
          type="text"
          placeholder="Enter room number"
          value={roomNumber}
          onChange={(e) => {
            setRoomNumber(e.target.value);
            setError(null); // Clear error when input changes
          }}
          className="form-control mb-3"
        />
        <button className="btn btn-success" onClick={handleJoinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
