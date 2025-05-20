import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProcessContext } from '../context/ProcessContext';
import InputTable from '../components/InputTable';
import SimulationControls from '../components/SimulationControls';
import ReadyQueue from '../components/ReadyQueue';
import CPUStatus from '../components/CPUStatus';
import { Statistics } from '../components';
import NavigationButtons from '../components/NavigationButtons';
import ProcessProgressList from '../components/ProcessProgressList';
import executeSelectedAlgorithm from '../helpers/ExecuteAlgorithm';
import { useNavigate } from 'react-router-dom';

export default function Simulate() {
  const navigate = useNavigate();
  const {
      processes,
      selectedAlgorithm,
      setProcesses,
      executed,
      setUpdatedProcesses,
      setExecuted,
      setStatisticsData,
      setAnotherUpdatedProcesses,
      setCurrentProcess,
      setProcessID,
      setIsPaused,
      isPaused,
      updatedProcesses,
    } = useContext(ProcessContext);
  let num_of_process = processes.length;

  const [simulationSpeed, setSimulationSpeed] = useState(1.0);
  const [timeQuantum, setTimeQuantum] = useState();

  const pausedRef = useRef(isPaused);

    useEffect(() => {
    pausedRef.current = isPaused;
    }, [isPaused]);

  const getPaused = () => pausedRef.current;

  const [simulationStarted, setSimulationStarted] = useState(false);

  const isNonPreemptive = [1,2,3, ''].includes(selectedAlgorithm);

  const handleStart = async () => {
    setSimulationStarted(true);
    await executeSelectedAlgorithm(selectedAlgorithm, num_of_process, processes, setProcesses, setUpdatedProcesses, setExecuted, setStatisticsData, setAnotherUpdatedProcesses, setCurrentProcess, getPaused);

  };

  const handleReset = () => {
    setSimulationStarted(false);
    setExecuted(false);
    setProcesses([]); 
    setProcessID(1);
    setStatisticsData([]);    
    setUpdatedProcesses([]);
    setAnotherUpdatedProcesses([]);
    navigate('/');
    window.location.reload();
  };

  const handleResume = () => { /* resume simulation logic */ };
  const handlePause = () => { /* pause simulation logic */ };
  const handleAgain= () => { /* forward step logic */ };
  const handleBack = () => { /* backward step logic */ }; 

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
        <div className="overflow-y-auto flex-shrink-0 max-h-[220px]">
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
        <div className="overflow-y-auto flex-shrink-0 max-h-[500px]">
          <ProcessProgressList 
            pprocesses={new.length ? updatedProcesses : processes}
          />
        </div>
      </div>
    </div>
  );
}
