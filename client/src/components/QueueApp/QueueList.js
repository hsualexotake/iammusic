import QueueItem from "./QueueItem";

const QueueList = ({ songs = [], onUpvote }) => {
  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th>Song</th>
          <th>Requests</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {songs.length > 0 ? (
          songs.map((song) => (
            <QueueItem key={song.queue_id} song={song} onUpvote={onUpvote} />
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
  );
};

export default QueueList;
