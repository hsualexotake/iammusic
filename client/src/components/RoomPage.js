import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QueueInput from "./QueueApp/QueueInput";
import QueueList from "./QueueApp/QueueList";

const RoomPage = () => {
  const { roomId } = useParams();
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchQueue = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/rooms/${roomId}/queue`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the queue.");
      }
      const data = await response.json();
      setSongs(data || []); // Safeguard against `null` or `undefined`
    } catch (err) {
      setError(err.message);
      setSongs([]); // Ensure `songs` is always an array
    }
  };

  useEffect(() => {
    fetchQueue();
  }, [roomId]);

  const handleAddSong = async (songName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/rooms/${roomId}/queue`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ song_name: songName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add song.");
      }

      const newSong = await response.json();
      setSongs((prevSongs) => [...prevSongs, newSong]);
      setSuccessMessage("Song added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleUpvote = async (queueId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/rooms/${roomId}/queue/${queueId}/upvote`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upvote song.");
      }

      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.queue_id === queueId
            ? { ...song, request_count: song.request_count + 1 }
            : song
        )
      );
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Room {roomId}</h2>
      {successMessage && (
        <p className="text-success text-center">{successMessage}</p>
      )}
      {error && <p className="text-danger text-center">{error}</p>}
      <QueueInput onAddSong={handleAddSong} />
      <QueueList songs={songs} onUpvote={handleUpvote} />
    </div>
  );
};

export default RoomPage;
