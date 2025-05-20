import React from 'react'

const InputTable = ({selectedAlgorithm , processes}) => {
    let usesPriority = (selectedAlgorithm === 3 || selectedAlgorithm === 4 || selectedAlgorithm === 7);
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
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default InputTable