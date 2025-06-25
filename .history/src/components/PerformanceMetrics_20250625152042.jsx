import React from 'react'

const PerformanceMetrics = ({ selectedAlgorithm, processes, executed }) => {
  let isNonPreemptive = (selectedAlgorithm === 1 || selectedAlgorithm === 2 || selectedAlgorithm === 3 || selectedAlgorithm === "");
  
  return (
    <div className='w-[500px] bg-gray-100 dark:bg-gray-800 px-4 py-4 rounded-xl text-black dark:text-gray-100'>
      <h2 className='text-[1.4rem] mb-3 font-bold text-center'>Scheduling Metrics <span className='text-[0.7rem] border-b-purple-500 border-b-2'>{isNonPreemptive ? 'Non-Preemptive' : 'Preemptive'}</span></h2>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-center">
        <thead className={isNonPreemptive ? 'text-[0.82rem]' : 'text-[0.72rem]' }>
            <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-[0.67rem]">Process ID</th>
                  {isNonPreemptive && (
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-[0.67rem]">Waiting/Response Time</th>
                  )}
                  {!isNonPreemptive && (
                    <>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-[0.67rem]">Waiting Time</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-[0.67rem]">Response Time</th>
                    </>
                  )}
                <th className="border border-gray-300 px-4 py-[0.67rem]">Turnaround Time</th>
            </tr>
        </thead>
        
        {executed ? 
          <tbody>
            {processes.map(process => (
            <tr key={process.processId} className="bg-white">
              <td className="border border-gray-300 px-4 py-2">P{process.processId}</td>
              {isNonPreemptive && (
                <td className="border border-gray-300 px-4 py-2">{process.startTime - process.arrivalTime}</td>
              )}
              {!isNonPreemptive && (
                <>
                  <td className="border border-gray-300 px-4 py-2">{(process.completionTime - process.arrivalTime) - process.burstTime}</td>
                  <td className="border border-gray-300 px-4 py-2">{process.startTime - process.arrivalTime}</td>
                </>
              )}
              <td className="border border-gray-300 px-4 py-2">{process.completionTime - process.arrivalTime}</td>
            </tr>
            ))} 
          </tbody>
         : ''
        }
      </table>
    </div>
  )
}

export default PerformanceMetrics
