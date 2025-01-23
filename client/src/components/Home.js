import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [showJoinInput, setShowJoinInput] = useState(false); // State to toggle input visibility
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomNumber.trim()) {
      navigate(`/room/${roomNumber}`);
    } else {
      setError("Room number cannot be empty.");
    }
  };

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
      navigate(`/room/${data.room_id}`);
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-black text-white flex flex-col items-center justify-center px-4">
      {/* Background Blur */}
      <div className="opacity-30 absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-indigo-300"></div>
      <div className="opacity-30 absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[15rem] w-[25rem] rounded-full blur-[10rem] bg-blue-600"></div>
      <div className="opacity-30 absolute top-[20%] left-[55%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-violet-500"></div>
      <div className="opacity-30 absolute top-[30%] left-[65%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-rose-900"></div>
      <div className="opacity-30 absolute top-[65%] left-[80%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-purple-800"></div>

      <header className="relative text-center mb-10 z-10">
        <h1 className="text-8xl font-extrabold mb-4 text-white">Kyu</h1>
        <p className="container text-xl font-light mb-6">
          Bridging Apple Music and Spotify
        </p>
      </header>

      <div className="relative w-full max-w-md text-center z-10">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Flex container for buttons */}
        <div className="flex justify-center gap-8 mt-8 items-start">
          {/* Create Room Button */}
          <button
            onClick={handleCreateRoom}
            className="bg-white text-black font-semibold text-lg h-[44px] px-8 rounded-full hover:scale-105 transition-transform"
          >
            Create Room
          </button>

          {/* Join Room Section */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setShowJoinInput(true)}
              className="bg-white text-black font-semibold text-lg h-[44px] px-8 rounded-full hover:scale-105 transition-transform"
            >
              Join Room
            </button>
            {/* Input field and confirm button */}
            {showJoinInput && (
              <div className="flex flex-col items-center gap-4 w-full">
                <input
                  type="text"
                  placeholder="Enter room number"
                  value={roomNumber}
                  onChange={(e) => {
                    setRoomNumber(e.target.value);
                    setError(null);
                  }}
                  className="w-full border border-gray-600 bg-gray-800 text-white py-3 px-6 rounded-lg"
                />
                <button
                  onClick={handleJoinRoom}
                  className="bg-white text-black font-semibold text-lg h-[44px] px-8 rounded-full hover:scale-105 transition-transform"
                >
                  Confirm Room
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
