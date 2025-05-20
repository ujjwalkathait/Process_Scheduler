import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

const ProcessProgressList = () => {
  const { processes } = useContext(ProcessContext);

  let len = processes.length;

  // Build exactly 10 rows
  const rows = Array.from({ length: 10 }, (_, i) => {
    const p = processes[i];
    const progressPct = p && p.burstTime > 0
      ? ((p.burstTime - p.remainingTime) / p.burstTime) * 100
      : 0;
    return {
      index: i + 1,
      progressPct,
      remaining: p ? p.remainingTime : 0,
      waiting: p ? p.waitingTime : 0,
    };
  });

  return (
    <div className="bg-black text-white border-2 border-green-500 rounded-lg p-4 w-full">
      {/* Header Row */}
      <div className="grid grid-cols-[1fr_4fr_2fr_2fr] gap-2 font-semibold mb-2">
        <div>#</div>
        <div>Processes</div>
        <div>Remaining Burst Time</div>
        <div>Waiting Time</div>
      </div>

      {/* Data Rows */}
      {rows.map(({ index, progressPct, remaining, waiting }) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_4fr_2fr_2fr] gap-2 items-center mb-1"
        >
          {/* Index */}
          <div>{index}.</div>

          {/* Progress Bar */}
          <div>
            <div className="bg-gray-700 rounded h-4 w-full overflow-hidden">
              <div
                className="bg-blue-500 h-4"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="text-xs text-center mt-1">
              {Math.round(progressPct)}%
            </div>
          </div>

          {/* Remaining Burst */}
          <div className="text-center">{remaining}</div>

          {/* Waiting Time */}
          <div className="text-center">{waiting}</div>
        </div>
      ))}
    </div>
  );
};

export default ProcessProgressList;
