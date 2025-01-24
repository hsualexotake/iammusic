import React from "react";

const QueueItem = ({ song, onUpvote, isDisabled }) => {
  return (
    <tr>
      <td className="py-4 px-6 text-white">{song.song_name}</td>
      <td className="py-4 px-6 text-white">{song.request_count}</td>
      <td className="py-4 px-6">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isDisabled
              ? "bg-gray-500 cursor-not-allowed text-white"
              : "bg-green-500 text-white hover:bg-green-600 hover:scale-105"
          }`}
          onClick={() => onUpvote(song.queue_id)}
          disabled={isDisabled}
        >
          {isDisabled ? "Upvoted" : "Upvote"}
        </button>
      </td>
    </tr>
  );
};

export default QueueItem;
