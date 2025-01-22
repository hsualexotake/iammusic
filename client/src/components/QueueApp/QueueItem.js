import React from "react";

const QueueItem = ({ song, onUpvote, isDisabled }) => {
  return (
    <tr>
      <td>{song.song_name}</td>
      <td>{song.request_count}</td>
      <td>
        <button
          className="btn btn-success"
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
