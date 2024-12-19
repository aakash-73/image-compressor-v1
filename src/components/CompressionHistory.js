import React from 'react';

const CompressionHistory = ({ history }) => {
  return (
    <div className="card mt-5 p-4">
      <h2>Compression History</h2>
      <ul className="list-group">
        {history.length === 0 ? (
          <li className="list-group-item">No history available.</li>
        ) : (
          history.map((item, index) => (
            <li key={index} className="list-group-item">
              <strong>{item.filename}</strong> - {item.compressionQuality * 100}% Quality
              <br />
              Compressed Size: {item.compressedSize} - Date: {item.date}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CompressionHistory;
