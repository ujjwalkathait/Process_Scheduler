import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

const ProcessProgressList = ({processes}) => {
  let len = processes.length;

  if(len < 10) {
    len = 10;
  }


  const rows = Array.from({ length: len }, (_, i) => {
    const p = processes[i];
    const progressPct = p && p.burstTime > 0
      ? ((p.burstTime - p.remainingTime) / p.burstTime) * 100
      : 0;
    return {
      index: i + 1,
      progressPct,
      remaining: p ? p.remainingTime : 0,
      waiting: p && typeof p.waitingTime === 'number' &&  ? p.waitingTime : 0,

    };
  });

  return (
    <div className="bg-black text-white border-2 rounded-lg p-4 w-full">
      {/* Header Row */}
      <div className="grid grid-cols-[1fr_4fr_2fr_2fr] border-2 border-green-500 gap-2 font-semibold mb-2">
        <div className='text-center'>Processes</div>
        <div className='text-center'>Status Bar</div>
        <div className='text-center'>Remaining Burst Time</div>
        <div className='text-center'>Waiting Time</div>
      </div>

      {/* Data Rows */}
      {rows.map(({ index, progressPct, remaining, waiting }, i) => (
        processes[i] ? (
          <div
            key={index}
            className="grid grid-cols-[1fr_4fr_2fr_2fr] gap-2 items-center mb-1"
          >
            <div className="text-center">P{index}</div>

            <div>
              <div className="bg-gray-700 rounded h-4 w-full overflow-hidden">
                <div
                  className="bg-blue-500 h-4 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="text-xs text-center mt-1">
                {Math.round(progressPct)}%
              </div>
            </div>

            <div className="text-center">{remaining}</div>
            <div className="text-center">{waiting}</div>
          </div>
        ) : (
          <div
            key={index}
            className="grid grid-cols-[1fr_4fr_2fr_2fr] gap-2 items-center mb-1 opacity-30"
          >
            <div className="text-center">—</div>
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="text-center">—</div>
            <div className="text-center">—</div>
          </div>
        )
      ))}
    </div>
  );
};

export default ProcessProgressList;
