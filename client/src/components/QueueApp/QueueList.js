import React from "react";

const QueueList = ({ songs = [], onUpvote, onDownvote, highlightedSongId }) => {
  const validSongs = Array.isArray(songs) ? songs : [];
  const totalRequests = validSongs.reduce(
    (sum, song) => sum + (song.request_count || 0),
    0
  );

  const sortedSongs = [...validSongs].sort(
    (a, b) => (b.request_count || 0) - (a.request_count || 0)
  );

  return (
    <table className="w-full bg-slate-800 rounded-xl shadow-lg overflow-hidden text-left mb-20">
      <thead className="bg-slate-900 text-lg font-semibold text-gray-400">
        <tr>
          <th className="py-4 px-6">Song</th>
          <th className="py-4 px-6">Requests</th>
          <th className="py-4 px-6">Progress</th>
          <th className="py-4 px-6">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800">
        {sortedSongs.map((song) => (
          <tr
            key={song.queue_id}
            className={`${
              highlightedSongId === song.queue_id
                ? "bg-yellow-200"
                : "bg-slate-900"
            } hover:bg-slate-700 transition-all duration-700 ease-in-out transform`}
          >
            <td className="py-4 px-6 flex items-center gap-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">
                {song.song_name ? song.song_name[0].toUpperCase() : "?"}
              </div>
              <span className="text-base text-white">
                {song.song_name || "Unknown Song"}
              </span>
            </td>
            <td className="py-4 px-6">
              <span className="text-base text-white">
                {song.request_count || 0}
              </span>
            </td>
            <td className="py-4 px-6">
              <div className="relative w-full bg-slate-700 h-2 rounded-lg">
                <div
                  className={`absolute top-0 left-0 h-2 rounded-lg ${
                    song.request_count > 50 ? "bg-green-500" : "bg-yellow-500"
                  }`}
                  style={{
                    width: `${
                      (song.request_count / totalRequests) * 100 || 0
                    }%`,
                  }}
                ></div>
              </div>
            </td>
            <td className="py-4 px-6 flex items-center justify-center gap-4">
              <button
                onClick={() => onUpvote(song.queue_id)}
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-all duration-200"
              >
                Upvote
              </button>
              <button
                onClick={() => onDownvote(song.queue_id)}
                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-all duration-200"
              >
                Downvote
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QueueList;
