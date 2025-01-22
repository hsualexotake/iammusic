import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomPage = () => {
  const { roomId } = useParams();
  const [songs, setSongs] = useState([]);
  const [newSongName, setNewSongName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchQueue = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/rooms/${roomId}/queue`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the queue.");
      }
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleUpvote = async (queueId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/rooms/queue/${queueId}/upvote`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upvote the song.");
      }

      const updatedSong = await response.json();

      // Update the frontend state
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.queue_id === queueId
            ? { ...song, request_count: updatedSong.request_count }
            : song
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const addSong = async () => {
    if (!newSongName.trim()) {
      setError("Song name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/rooms/${roomId}/queue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ song_name: newSongName }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to add the song to the queue."
        );
      }

      // Clear the input field and success/error messages
      setNewSongName("");
      setSuccessMessage("Song added successfully!");
      setError("");

      // Re-fetch the updated queue from the backend
      fetchQueue();
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    fetchQueue();
  }, [roomId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Room {roomId}</h2>

      {error && <p className="text-danger text-center">{error}</p>}
      {successMessage && (
        <p className="text-success text-center">{successMessage}</p>
      )}

      <div className="d-flex justify-content-center mt-3">
        <input
          type="text"
          placeholder="Enter song name"
          className="form-control w-50 me-2"
          value={newSongName}
          onChange={(e) => setNewSongName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addSong}>
          Add Song
        </button>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Song</th>
            <th>Requests</th>
          </tr>
        </thead>
        <tbody>
          {songs.length > 0 ? (
            songs.map((song) => (
              <tr key={song.queue_id}>
                <td>{song.song_name}</td>
                <td>{song.request_count}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleUpvote(song.queue_id)}>Upvote</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No songs in the queue.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomPage;
