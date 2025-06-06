import React, { createContext, useState } from 'react';

export const ProcessContext = createContext();

export const ProcessProvider = ({ children }) => {
  const [arrivalTime, setArrivalTime] = useState();
  const [burstTime, setBurstTime] = useState();
  const [processId, setProcessID] = useState(1);
  const [processes, setProcesses] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [priority, setPriority] = useState();
  const [executed, setExecuted] = useState(false);
  const [statisticsData, setStatisticsData] = useState([]);

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
    setArrivalTime,
    setBurstTime,
    setProcessID,
    setProcesses,
    setSelectedAlgorithm,
    setPriority,
    setExecuted,
    setStatisticsData,
    setCurrentProcess,
  };

  return (
    <ProcessContext.Provider value={value}>
      {children}
    </ProcessContext.Provider>
  );
};