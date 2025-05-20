import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

export default function Simulate() {
  const {
      processes,
    } = useContext(ProcessContext);
  return (
    <div className="w-full bg-white my-6 flex flex-row gap-10">
      {/* Left Panel */}
      <div className="space-y-4 col-span-1">
        {/* <SimulationControls /> */}
        {/* <InputTable
          processes={processes}
        /> */}
        {/* <ReadyQueue />
        <div className="space-y-2">
          <CPUStatus status="Idle" algorithm={selectedAlgorithm} />
          <StatsPanel stats={statisticsData} />
        </div> */}
      </div>

      {/* Right Panel */}
      {/* <div className="col-span-2 space-y-4">
        <NavigationButtons />
        <ProcessList />
        <GanttChart />
      </div> */}
    </div>
  );
}
