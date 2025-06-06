import React, { useContext, useState } from 'react';
import { ProcessContext } from '../context/ProcessContext';
import InputTable from '../components/InputTable';
import SimulationControls from '../components/SimulationControls';
import ReadyQueue from '../components/ReadyQueue';
import CPUStatus from '../components/CPUStatus';
import { Statistics } from '../components';

export default function Simulate() {
  const {
      processes,
      selectedAlgorithm,
      setProcesses,
      executed,
    } = useContext(ProcessContext);
  const [simulationSpeed, setSimulationSpeed] = useState(1.0);
  const [timeQuantum, setTimeQuantum] = useState();

  const handleSimulate = () => { /* start simulation logic */ };
  const handlePause = () => { /* pause simulation logic */ };
  const handleForward = () => { /* forward step logic */ };
  const handleBack = () => { /* backward step logic */ };
  const handleExit = () => { /* cleanup / reset logic */ }; 

  return (
    <div className="w-full bg-white my-6 flex flex-row gap-10">
      <div className="space-y-4 col-span-1">
        <SimulationControls 
          simulationSpeed={simulationSpeed}
          setSimulationSpeed={setSimulationSpeed}
          timeQuantum={timeQuantum}
          setTimeQuantum={setTimeQuantum}
          selectedAlgorithm={selectedAlgorithm}
        />
        <InputTable
          processes={processes}
          selectedAlgorithm={selectedAlgorithm}
        />
        <ReadyQueue />
        <div className="space-y-2">
          <CPUStatus status="Idle" algorithm={selectedAlgorithm} />
          <Statistics 
            selectedAlgorithm={selectedAlgorithm}
            processes={processes}
            setProcesses={setProcesses}
            executed={executed}
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="col-span-2 space-y-4">
        <NavigationButtons
              onStart={handleStart}
              onReset={handleReset}
          />
        {/* <ProcessList /> */}
      </div>
    </div>
  );
}
