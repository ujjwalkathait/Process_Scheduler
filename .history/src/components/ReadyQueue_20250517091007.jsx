import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

const ReadyQueue = () => {
  const { processes, currentProcess } = useContext(ProcessContext);

  // Filter out processes which are completed (i.e. completionTime is set)
  const activeProcesses = processes.filter(p => !p.completionTime);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-3">Ready Queue</h2>

      <div className="flex space-x-4 w-max">
        {activeProcesses.length === 0 ? (
          <p className="text-gray-500">No active processes in the queue.</p>
        ) : (
          activeProcesses.map((process) => (
            <div
              key={process.processId}
              className={`min-w-[80px] text-center px-4 py-2 rounded-lg text-white font-semibold
                ${currentProcess === process.processId ? 'bg-green-600 animate-pulse' : 'bg-blue-500'}
              `}
            >
              P{process.processId}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReadyQueue;
