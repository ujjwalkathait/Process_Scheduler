import React, { useContext } from 'react';
import { Statistics, GanttChart, GanttChartTable, PerformanceMetrics } from '../components';
import { ProcessContext } from '../context/ProcessContext';

export default function Result() {
  const {
    processes,
    newProcesses,
    updatedProcesses,
    executed,
    selectedAlgorithm,
    setProcesses,
  } = useContext(ProcessContext);

  if (!executed) return null;

  const isNonPreemptive = [1,2,3, ''].includes(selectedAlgorithm);

  return (
    <>
      <div className="w-full bg-white dark:bg-gray-900 text-black dark:text-gray-100 my-10 flex flex-row gap-5">
        <GanttChartTable
          selectedAlgorithm={selectedAlgorithm}
          processes={newProcesses}
          executed={executed}
        />
        <PerformanceMetrics
          selectedAlgorithm={selectedAlgorithm}
          // processes={processes}
          processes={newProcesses}
          executed={executed}
        />
      </div>
      <div className='w-full bg-white dark:bg-gray-900 text-black dark:text-gray-100 my-10 flex flex-row gap-5'>
        {/* <Statistics 
          selectedAlgorithm={selectedAlgorithm}
          // processes={processes}
          processes={newProcesses}
          setProcesses={setProcesses}
          executed={executed}
        /> */}
        <Statistics 
          selectedAlgorithm={selectedAlgorithm}
          // processes={processes}
          processes={newProcesses.length ? newProcesses : processes}
          setProcesses={setProcesses}
          executed={executed}
        />
        <GanttChart
          processes={isNonPreemptive ? newProcesses : updatedProcesses}
          executed={executed}
          selectedAlgorithm={selectedAlgorithm}
        />
      </div>
    </>
  );
}
