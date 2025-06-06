import React, { createContext, useRef, useState } from 'react';

export const ProcessContext = createContext();

export const ProcessProvider = ({ children }) => {
  const [arrivalTime, setArrivalTime] = useState();
  const [burstTime, setBurstTime] = useState();
  const [processId, setProcessID] = useState(1);
  const [processes, setProcesses] = useState([]);
  const [newProcesses, setUpdatedProcesses] = useState([]);
  const [updatedProcesses, setAnotherUpdatedProcesses] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [priority, setPriority] = useState();
  const [executed, setExecuted] = useState(false);
  const [statisticsData, setStatisticsData] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const delayRef = useRef(1000);


  const [currentProcess, setCurrentProcess] = useState(null);

  const value = {
    arrivalTime,
    burstTime,
    processId,
    processes,
    newProcesses,
    updatedProcesses,
    selectedAlgorithm,
    priority,
    executed,
    statisticsData,
    currentProcess, 
    isPaused,
    delayRef,
    setArrivalTime,
    setBurstTime,
    setProcessID,
    setProcesses,
    setUpdatedProcesses,
    setAnotherUpdatedProcesses,
    setSelectedAlgorithm,
    setPriority,
    setExecuted,
    setStatisticsData,
    setCurrentProcess,
    setIsPaused,
  };

  return (
    <ProcessContext.Provider value={value}>
      {children}
    </ProcessContext.Provider>
  );
};