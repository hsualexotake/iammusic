import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const QueuePage = () => {
  const { roomId } = useParams(); // Get the room ID from the URL
  const [songs, setSongs] = useState([]);
  const [newSongName, setNewSongName] = useState(""); // State for new song input
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch queue for the current room
  const fetchQueue = async () => {
    try {
      const response = await fetch(`http://localhost:8080/queue/${roomId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the queue.");
      }
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add a new song to the queue
  const addSong = async () => {
    if (!newSongName.trim()) {
      setError("Song name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/queue/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ song_name: newSongName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to add the song to the queue."
        );
      }

      const updatedSong = await response.json();

      setSongs((prevSongs) => {
        // Check if the song already exists in the queue
        const songIndex = prevSongs.findIndex(
          (song) => song.song_name === updatedSong.song_name
        );

        if (songIndex !== -1) {
          // If the song exists, update its request_count
          const updatedSongs = [...prevSongs];
          updatedSongs[songIndex] = updatedSong;
          return updatedSongs;
        } else {
          // If the song doesn't exist, add it to the list
          return [...prevSongs, updatedSong];
        }
      });

      setNewSongName(""); // Clear the input field
      setSuccessMessage("Song added successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };

  // Fetch the queue when the component mounts
  useEffect(() => {
    fetchQueue();
  }, [roomId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Room ID: {roomId}</h2>

      {error && <p className="text-danger text-center">{error}</p>}
      {successMessage && (
        <p className="text-success text-center">{successMessage}</p>
      )}

      {/* Add Song Form */}
      <div className="d-flex justify-content-center mt-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter song name"
          value={newSongName}
          onChange={(e) => setNewSongName(e.target.value)}
        />
        <button className="btn btn-primary ml-3" onClick={addSong}>
          Add Song
        </button>
      </div>

      {/* Queue Table */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist - mapped to roomId for now</th>
            <th>Requests</th>
          </tr>
        </thead>
        <tbody>
          {songs.length > 0 ? (
            songs.map((song) => (
              <tr key={song.queue_id}>
                <td>{song.song_name}</td>
                <td>{song.room_id}</td>
                <td>{song.request_count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No songs in the queue.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueuePage;
