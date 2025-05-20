import React, { useContext, useState } from 'react';
import { ProcessContext } from '../context/ProcessContext';
import InputTable from '../components/InputTable';
import SimulationControls from '../components/SimulationControls';
import ReadyQueue from '../components/ReadyQueue';
import CPUStatus from '../components/CPUStatus';
import { Statistics } from '../components';
import NavigationButtons from '../components/NavigationButtons';
import ProcessProgressList from '../components/ProcessProgressList';

export default function Simulate() {
  const {
      processes,
      selectedAlgorithm,
      setProcesses,
      executed,
    } = useContext(ProcessContext);
  const [simulationSpeed, setSimulationSpeed] = useState(1.0);
  const [timeQuantum, setTimeQuantum] = useState();

  const [simulationStarted, setSimulationStarted] = useState(false);

  const handleStart = () => {
    setSimulationStarted(true);
    // Optionally trigger a scheduling function here
    // e.g., runScheduler(processes, ...)
  };

  const handleReset = () => {
    setSimulationStarted(false);
    window.location.reload(); // or manually reset context state
  };

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
        <div className="overflow-y-auto flex-shrink-0 max-h-[200px]">
          <InputTable
            processes={processes}
            selectedAlgorithm={selectedAlgorithm}
          />
        </div>
        <div className="rounded p-2 max-w-[500px] overflow-x-auto">
          <ReadyQueue />
        </div>
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
        <div className="overflow-y-auto flex-shrink-0 max-h-[200px]">
          <ProcessProgressList />
        </div>
      </div>
    </div>
  );
}
