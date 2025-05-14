import React from 'react';

export default function ProcessList({ processes }) {
  return (
    <div className="border-2 border-green-500 p-2 rounded-lg">
      <h4 className="font-semibold mb-2">Processes</h4>
      {processes.map((p, idx) => (
        <div key={p.id} className="flex items-center mb-2">
          <span className="w-6">{idx+1}.</span>
          <span className="flex-1">{p.id}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-4 mx-2 overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${p.progress}%` }}
            />
          </div>
          <span className="w-8 text-center">{p.remaining}</span>
          <span className="w-8 text-center">{p.waiting}</span>
        </div>
      ))}
    </div>
  );
}
