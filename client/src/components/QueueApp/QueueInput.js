import React, { useState } from "react";

const QueueInput = ({ onAddSong }) => {
  const [songName, setSongName] = useState("");

  const handleAddSong = () => {
    if (songName.trim()) {
      onAddSong(songName);
      setSongName(""); // Clear the input field after adding the song
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <input
        type="text"
        placeholder="Enter song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        className="w-full max-w-md bg-slate-800 text-white text-lg py-3 px-6 rounded-full border border-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleAddSong}
        className="bg-indigo-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-600 transition-all"
      >
        Add Song
      </button>
    </div>
  );
};

export default QueueInput;
