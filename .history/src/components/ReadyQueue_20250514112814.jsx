import React from 'react';

export default function ReadyQueue({ queue }) {
  return (
    <div className="border-2 border-green-500 p-2 rounded-lg">
      <h4 className="font-semibold mb-1">Ready Queue:</h4>
      <div className="whitespace-nowrap overflow-x-auto">
        {queue.length
          ? queue.map((pid, idx) => <span key={idx} className="mx-1">{pid}</span>)
          : <span className="text-gray-500">&lt; empty &gt;</span>
        }
      </div>
    </div>
  );
}
