// pages/Simulate.jsx
import React from 'react';
import InputTable from '../components/InputTable';
import NavigationButtons from '../components/NavigationButtons';
import ProcessList from '../components/ProcessList';
import GanttChart from '../components/GanttChart';
import { ProcessContext } from '../context/ProcessContext';

export default function Simulate() {
  const {
      processes,
    } = useContext(ProcessContext);
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-black text-white min-h-screen">
      {/* Left Panel */}
      <div className="space-y-4 col-span-1">
        {/* <SimulationControls /> */}
        <InputTable
          processes={processes}
        />
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
