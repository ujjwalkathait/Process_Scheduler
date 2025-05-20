import React from 'react'

const InputTable = () => {
  return (
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
                        <td className="border border-gray-300 px-4 py-2">P{index+1}</td>
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
  )
}

export default InputTable