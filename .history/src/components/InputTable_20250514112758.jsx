import React from 'react';

export default function InputTable({ processes, onUpdateProcess }) {
  return (
    <div className="border-2 border-green-500 p-2 rounded-lg overflow-auto h-48">
      <table className="w-full text-sm table-auto">
        <thead>
          <tr>
            {['Process ID','Arrival Time','Burst Time','Priority'].map(h => (
              <th key={h} className="px-2 py-1">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processes.map((p, i) => (
            <tr key={i}>
              <td className="px-2 py-1">{p.id}</td>
              <td className="px-2 py-1">
                <input
                  type="number"
                  value={p.arrival}
                  onChange={e => onUpdateProcess(i, 'arrival', e.target.value)}
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-2 py-1">
                <input
                  type="number"
                  value={p.burst}
                  onChange={e => onUpdateProcess(i, 'burst', e.target.value)}
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-2 py-1">
                <input
                  type="number"
                  value={p.priority}
                  onChange={e => onUpdateProcess(i, 'priority', e.target.value)}
                  className="w-16 p-1 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
