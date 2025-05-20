import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

const ReadyQueue = () => {
  const { processes, currentProcess } = useContext(ProcessContext);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-3">Ready Queue</h2>

      <div className="flex space-x-4 w-max">
        {processes.length === 0 ? (
          <p className="text-gray-500">No processes in the queue.</p>
        ) : (
          processes.map((process) => (
            <div
              key={process.processId}
              className={`min-w-[80px] text-center px-4 py-2 rounded-lg text-white font-semibold
                ${currentProcess === process.processId ? 'bg-green-600' : 'bg-blue-500'}
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
    