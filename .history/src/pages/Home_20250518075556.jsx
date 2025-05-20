import React, { useContext } from 'react';
import { SelectAlgorithm, ProcessData, ProcessTable } from '../components';
import { ProcessContext } from '../context/ProcessContext';

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
    setExecuted,
    setStatisticsData,
    setSelectedAlgorithm,
    setUpdatedProcesses,
    setAnotherUpdatedProcesses,
    setCurrentProcess,
  } = useContext(ProcessContext);

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

  const onReset = () => {
    setExecuted(false);
    setProcesses([]); 
    setProcessID(1);
    setStatisticsData([]);    
    setUpdatedProcesses([]);
    setAnotherUpdatedProcesses([]);
  }

  return (
    <div className="w-full bg-white my-6 flex flex-row gap-10">
      <div className="flex flex-row justify-evenly rounded-xl bg-slate-100 w-[480px] h-[46%] p-5">
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
          setExecuted={setExecuted}
          setStatisticsData={setStatisticsData}
          setUpdatedProcesses={setUpdatedProcesses}
          setAnotherUpdatedProcesses={setAnotherUpdatedProcesses}
          setCurrentProcess={setCurrentProcess}
        />
      </div>
      <ProcessTable
        selectedAlgorithm={selectedAlgorithm}
        processes={processes}
        onDeleteProcess={onDeleteProcess}
        onReset={onReset}
      />
    </div>
  );
}