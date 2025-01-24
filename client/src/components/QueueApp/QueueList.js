import React from "react";
import QueueItem from "./QueueItem";

const QueueList = ({ songs = [], onUpvote }) => {
  // Safeguard: Ensure songs is always an array
  const validSongs = Array.isArray(songs) ? songs : [];

  // Calculate total requests
  const totalRequests = validSongs.reduce(
    (sum, song) => sum + (song.request_count || 0),
    0
  );

  // Sort songs by request count
  const sortedSongs = [...validSongs].sort(
    (a, b) => (b.request_count || 0) - (a.request_count || 0)
  );

  return (
    <table className="w-full bg-slate-800 rounded-xl shadow-lg overflow-hidden text-left mb-20">
      {/* Table Header */}
      <thead className="bg-slate-900 text-lg font-semibold text-gray-400">
        <tr>
          <th className="py-4 px-6">Song</th>
          <th className="py-4 px-6">Requests</th>
          <th className="py-4 px-6">Progress</th>
          <th className="py-4 px-6">Actions</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-slate-800">
        {sortedSongs.length > 0 ? (
          sortedSongs.map((song, index) => {
            // Safeguard: Check if song has valid properties
            if (!song || typeof song !== "object") return null;

            // Calculate progress percentage
            const progressPercentage = totalRequests
              ? Math.round((song.request_count / totalRequests) * 100)
              : 0;

            // Determine progress bar color
            const progressColor =
              progressPercentage >= 70
                ? "bg-green-500"
                : progressPercentage >= 50
                ? "bg-blue-500"
                : progressPercentage >= 30
                ? "bg-purple-500"
                : progressPercentage >= 20
                ? "bg-yellow-500"
                : "bg-red-500";

            return (
              <tr
                key={song.queue_id || index} // Safeguard: Use index as fallback key
                className={`${
                  index % 2 === 0 ? "bg-slate-900" : "bg-slate-900"
                } hover:bg-slate-700 transition-all duration-200`}
              >
                {/* Song Name */}
                <td className="py-4 px-6 flex items-center gap-4">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">
                    {song.song_name ? song.song_name[0].toUpperCase() : "?"}
                  </div>
                  <span className="text-base text-white">
                    {song.song_name || "Unknown Song"}
                  </span>
                </td>

                {/* Request Count */}
                <td className="py-4 px-6">
                  <span className="text-base text-white">
                    {song.request_count || 0}
                  </span>
                </td>

                {/* Progress Bar */}
                <td className="py-4 px-6">
                  <div className="relative w-full bg-slate-700 h-2 rounded-lg">
                    <div
                      className={`absolute top-0 left-0 h-2 rounded-lg ${progressColor}`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 mt-1 block">
                    {progressPercentage}%
                  </span>
                </td>

                {/* Upvote Button */}
                <td className="py-4 px-6">
                  <button
                    onClick={() => onUpvote(song.queue_id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-all duration-200"
                    disabled={!song.queue_id} // Disable button if queue_id is missing
                  >
                    Upvote
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          // No Songs in the Queue
          <tr>
            <td
              colSpan="4"
              className="py-6 text-center text-gray-400 text-sm italic"
            >
              No songs in the queue.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default QueueList;
