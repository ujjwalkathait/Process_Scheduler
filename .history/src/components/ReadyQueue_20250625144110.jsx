import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

const ReadyQueue = () => {
  const { processes, currentProcess } = useContext(ProcessContext);

  // show only those not yet completed
  const active = processes.filter(p => p.remainingTime > 0);

  return (
    <div className=" bg-black text-white dark:bg--800 dark:text-gray-100 p-3 rounded-lg w-full overflow-x-auto">
      <h3 className="font-semibold mb-2">Ready Queue:</h3>
    {active.length === 0 ? (
        <p className="italic text-gray-400 dark:text-gray-500">— empty —</p>
    ) : (
        <div className="flex space-x-2">
        {active.map(p => (
            <div
            key={p.processId}
            className={
                `px-3 py-1 rounded text-sm font-medium whitespace-nowrap ` +
                (currentProcess === p.processId
                ? 'bg-green-600 animate-pulse'
                : 'bg-gray-700')
            }
            >
            P{p.processId}
            </div>
        ))}
        </div>
    )}
    </div>
  );
};

export default ReadyQueue;
