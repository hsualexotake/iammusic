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
    <div className="mb-3">
      <input
        type="text"
        placeholder="Enter song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        className="form-control"
      />
      <button className="btn btn-primary mt-2" onClick={handleAddSong}>
        Add Song
      </button>
    </div>
  );
};

export default QueueInput;
