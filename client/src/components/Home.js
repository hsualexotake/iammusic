import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

const Home = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false); // Track if the page has loaded
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the animation after the component mounts
    setIsPageLoaded(true);
  }, []);

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
    <div className="relative min-h-screen bg-gradient-to-br from-stone-950 to-stone-950 text-white flex flex-col items-center justify-center px-4">
      {/* Static Background Blur */}
      <div className="opacity-30 absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-indigo-200"></div>
      <div className="opacity-30 absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[15rem] w-[25rem] rounded-full blur-[10rem] bg-blue-500"></div>
      <div className="opacity-30 absolute top-[20%] left-[55%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-violet-400"></div>
      <div className="opacity-30 absolute top-[30%] left-[65%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-rose-800"></div>
      <div className="opacity-30 absolute top-[45%] left-[72%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-[#30ac51]"></div>
      <div className="opacity-30 absolute top-[78%] left-[70%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-[#82164e]"></div>
      <div className="opacity-30 absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 -z-8 h-[20rem] w-[35rem] rounded-full blur-[10rem] bg-[#a92278]"></div>

      {/* Animated Header */}
      <header
        className={`relative text-center mb-10 z-10 transition-all duration-[5s] ease-in-out ${
          isPageLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-0"
        }`}
      >
        <h1 className="text-8xl font-extrabold mb-4 text-white">Name</h1>
        <p className="container text-xl font-light mb-6">
          Bridging Apple Music and Spotify
        </p>
      </header>

      {/* Fixed container for dynamic content */}
      <div
        className={`relative w-full max-w-md text-center z-10 transition-all duration-[5s] ease-in-out ${
          isPageLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-0"
        }`}
      >
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Flex container for buttons */}
        <div className="flex flex-col gap-6 mt-8 items-center w-full">
          {/* Create and Join Room Buttons */}
          <div className="flex justify-center gap-8 w-full">
            <button
              onClick={handleCreateRoom}
              className="bg-white text-black font-semibold text-lg h-[44px] px-8 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
            >
              <PencilSquareIcon className="h-6 w-6 text-black" />
              Create Room
            </button>
            <button
              onClick={() => setShowJoinInput(!showJoinInput)}
              className="bg-white text-black font-semibold text-lg h-[44px] px-8 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-black" />
              Join Room
            </button>
          </div>

          {/* Fixed-height container for input */}
          <div className="w-full" style={{ height: "120px" }}>
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
                  className="w-full border border-gray-600 bg-slate-800 text-white py-3 px-6 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
