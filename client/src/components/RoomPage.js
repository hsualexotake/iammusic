import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QueueInput from "./QueueApp/QueueInput";
import QueueList from "./QueueApp/QueueList";

const RoomPage = () => {
  const { roomId } = useParams();
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isBlurGreen, setIsBlurGreen] = useState(false); // State for blur color

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

      // Temporarily turn all blurs green
      setIsBlurGreen(true);
      setTimeout(() => setIsBlurGreen(false), 1000); // Reset blur color after 1 second

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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 to-slate-950 text-white flex flex-col items-center justify-center px-4">
      {/* Dynamic Background Blurs */}
      <div
        className={`opacity-30 absolute top-[10%] left-[23%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] transition-colors duration-500 ${
          isBlurGreen ? "bg-green-500" : "bg-red-400"
        }`}
      ></div>
      <div
        className={`opacity-30 absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[23rem] w-[40rem] rounded-full blur-[10rem] transition-colors duration-500 ${
          isBlurGreen ? "bg-green-500" : "bg-indigo-400"
        }`}
      ></div>
      <div
        className={`opacity-30 absolute top-[10%] left-[78%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] transition-colors duration-500 ${
          isBlurGreen ? "bg-green-500" : "bg-purple-400"
        }`}
      ></div>

      {/* Header Section */}
      <header className="relative text-center mb-10 z-10">
        <h2 className="text-6xl font-extrabold mb-4 text-white font-inter tracking-wide mt-12">
          Room ID: {roomId}
        </h2>
      </header>

      {/* Main Content */}
      <div className="relative w-full max-w-3xl text-center z-10">
        {/* Fixed-height container for messages */}
        <div className="h-8 mb-4">
          {successMessage && (
            <p className="text-green-500 text-lg font-semibold">
              {successMessage}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          )}
        </div>

        {/* Input and List Components */}
        <QueueInput onAddSong={handleAddSong} />
        <QueueList songs={songs} onUpvote={handleUpvote} />
      </div>
    </div>
  );
};

export default RoomPage;
