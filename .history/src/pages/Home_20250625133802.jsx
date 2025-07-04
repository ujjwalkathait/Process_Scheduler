import React, { useContext } from 'react';
import { SelectAlgorithm, ProcessData, ProcessTable } from '../components';
import { ProcessContext } from '../context/ProcessContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const {
    arrivalTime,
    burstTime,
    processId,
    processes,
    selectedAlgorithm,
    priority,
    setArrivalTime,
    setBurstTime,
    setProcessID,
    setProcesses,
    setPriority,
    setSelectedAlgorithm,
  } = useContext(ProcessContext);
  
  const navigate = useNavigate();
  
  const onDeleteProcess = (processIdToDelete) => {
    setProcesses(prevProcesses => {
      const updated = prevProcesses
        .filter(process => process.processId !== processIdToDelete)
        .map((process, index) => ({
          ...process,
          processId: index + 1
        }));
      return updated;
    });
  };


  const handleCompare = () => {
    if (processes.length === 0) {
      alert("Add some processes first!");
      return;
    }
    navigate('/best');
  };

  return (
    <>
      <div className="w-full bg-white dark:bg-gray-900 my-6 flex flex-row gap-10 text-gray-900 dark:text-gray-100">
        <div className="flex flex-row justify-evenly rounded-xl bg-slate-100 dark:bg-slate-700 w-[480px] h-[46%] p-5">
          <SelectAlgorithm
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={value => setSelectedAlgorithm(value)}
          />
          <ProcessData
            processId={processId}
            arrivalTime={arrivalTime}
            burstTime={burstTime}
            priority={priority}
            setProcessID={setProcessID}
            processes={processes}
            setProcesses={setProcesses}
            setArrivalTime={setArrivalTime}
            setBurstTime={setBurstTime}
            setPriority={setPriority}
            selectedAlgorithm={selectedAlgorithm}
          />
        </div>
        <ProcessTable
          selectedAlgorithm={selectedAlgorithm}
          processes={processes}
          onDeleteProcess={onDeleteProcess}
        />
      </div>
      <div className="flex flex-row justify-center rounded-xlw-[100%] h-[46%] p-5">
        <button
          onClick={handleCompare}
          className="simulate bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400"
          >
          Compare Algorithms
        </button>
      </div>
    </>
  );
}