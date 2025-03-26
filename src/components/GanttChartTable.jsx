import React from 'react'

const GanttChartTable = ({ selectedAlgorithm, processes, executed }) => {
    let usesPriority = (selectedAlgorithm === 3 || selectedAlgorithm === 4 || selectedAlgorithm === 7);
    
    return (
        <div className="w-[770px] bg-gray-100 p-4 rounded-xl">
            <h2 className='text-[1.4rem] mb-3 font-bold text-center'>Gantt Chart Table</h2>
            <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Process ID</th>
                        {usesPriority && (
                            <th className="border border-gray-300 px-4 py-2">Priority</th>
                        )}
                        <th className="border border-gray-300 px-4 py-2">Arrival Time</th>
                        <th className="border border-gray-300 px-4 py-2">Burst Time</th>
                        <th className="border border-gray-300 px-4 py-2">Start Time</th>
                        <th className="border border-gray-300 px-4 py-2">Completion Time</th>
                    </tr>
                </thead>
                {executed ? 
                    <tbody>
                        {processes.map(process => (
                        <tr key={process.processId} className="bg-white">
                            <td className="border border-gray-300 px-4 py-2">P{process.processId}</td>
                            {usesPriority && (
                                <td className="border border-gray-300 px-4 py-2">{process.priority}</td>
                            )}
                            <td className="border border-gray-300 px-4 py-2">{process.arrivalTime}</td>
                            <td className="border border-gray-300 px-4 py-2">{process.burstTime}</td>
                            <td className="border border-gray-300 px-4 py-2">{process.startTime}</td>
                            <td className="border border-gray-300 px-4 py-2">{process.completionTime}</td>
                        </tr>
                    ))}
                 </tbody>  : ''
                }
            </table>
        </div>
    )
}

export default GanttChartTable
