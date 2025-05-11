import React from 'react';
import { FaTrash } from 'react-icons/fa';

const ProcessTable = ({ selectedAlgorithm, processes, onDeleteProcess, onReset }) => {
    let usesPriority = (selectedAlgorithm === 3 || selectedAlgorithm === 4 || selectedAlgorithm === 7);
  return (
    <div className="w-[770px] bg-gray-100 px-6 py-3 rounded-xl">
        <div className='flex flex-row justify-between'>
            <h2 className='text-[1.4rem] mb-3 font-bold text-center'>Process Data Table</h2>
            <button
                className='reset bg-yellow-600 hover:bg-yellow-700 font-bold text-[1rem] text-center text-white px-[1.4rem] py-[0.4rem] mb-2 rounded-lg focus:outline-none'
                type="submit"
                onClick={e => {onReset()}}
            >
                Reset
            </button>
        </div>
        <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
            <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Process ID</th>
            <th className="border border-gray-300 px-4 py-2">Arrival Time</th>
            <th className="border border-gray-300 px-4 py-2">Burst Time</th>
            {usesPriority && (
                <th className="border border-gray-300 px-4 py-2">Priority</th>
            )}
            <th className="border border-gray-300 px-4 py-2">Action</th> {/* New column for actions */}
            </tr>
        </thead>
        <tbody>
            {processes.map((process, index) => (
            <tr key={process.processId} className="bg-white">
                <td className="border border-gray-300 px-4 py-2">P{process.index+1}</td>
                <td className="border border-gray-300 px-4 py-2">{process.arrivalTime}</td>
                <td className="border border-gray-300 px-4 py-2">{process.burstTime}</td>
                {usesPriority && (
                <td className="border border-gray-300 px-4 py-2">{process.priority}</td>
                )}
                <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => onDeleteProcess(process.processId)} className="text-red-500 hover:text-red-700 focus:outline-none">
                    <FaTrash /> 
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default ProcessTable;
