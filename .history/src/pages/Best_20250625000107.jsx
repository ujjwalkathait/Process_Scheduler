// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { ProcessContext } from '../context/ProcessContext';
// import compareAlgorithms from '../helpers/CompareAlgo';

// const Best = () => {
//   const { processes, setUpdatedProcesses, setProcesses } = useContext(ProcessContext);
//   const [bestAlgorithm, setBestAlgorithm] = useState(null);

//   useEffect(() => {
//     const result = compareAlgorithms(processes, setUpdatedProcesses, setProcesses);
//     setBestAlgorithm(result.bestAlgorithm);

//     console.log("Best Algorithm:", result.bestAlgorithm);
//     console.log("All Results:", result.allResults);

//   }, [processes]);


//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Algorithm Comparison</h2>
//       <p>Based on the current process data, the best algorithm is:</p>
//       <p className="text-2xl font-semibold text-green-600 mt-2">
//         {bestAlgorithm ? bestAlgorithm : 'Calculating...'}
//       </p>
//     </div>
//   );
// }

// export default Best



import React, { useContext, useEffect, useState } from 'react';
import { ProcessContext } from '../context/ProcessContext';
import compareAlgorithms from '../helpers/CompareAlgo';
import { CompareAlgorithmsChart } from '../components';

const Best = () => {
  const { processes, setUpdatedProcesses, setProcesses, statisticsData , setStatisticsData } = useContext(ProcessContext);
  const [bestAlgorithm, setBestAlgorithm] = useState(null);
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    if (processes.length === 0) return;

    const result = compareAlgorithms(processes, setUpdatedProcesses, setProcesses);
    setBestAlgorithm(result.bestAlgorithm);
    setAllResults(result.allResults);
  }, [processes]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Algorithm Comparison</h2>
      <p>Based on the current process data, the best algorithm is:</p>
      <p className="text-2xl font-semibold text-green-600 mt-2">
        {bestAlgorithm ?? 'Calculating...'}
      </p>

      {allResults.length > 0 && (
        <>
          <table className="mt-6 w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Algorithm</th>
                <th className="border p-2">Avg Turnaround Time</th>
                <th className="border p-2">Avg Waiting Time</th>
              </tr>
            </thead>
            <tbody>
              {allResults.map((algo, index) => (
                <tr key={index}>
                  <td className="border p-2">{algo.algorithm}</td>
                  <td className="border p-2">{algo.average_turnaround_time}</td>
                  <td className="border p-2">{algo.average_waiting_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full bg-white my-10 flex flex-row gap-5">
            <CompareAlgorithmsChart metrics={allResults} />
          </div>
        </>
      )}
    </div>
  );
};

export default Best;
