import React, { createContext, useState } from 'react';

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
    setArrivalTime,
    setBurstTime,
    setProcessID,
    setProcesses,
    setUpdatedProcesses,
    setAnotherUpdatedProcesses,
    setSelectedAlgorithm,
    setPriority,
    setExecuted,
    setStatisticsData
  };

  return (
    <ProcessContext.Provider value={value}>
      {children}
    </ProcessContext.Provider>
  );
};