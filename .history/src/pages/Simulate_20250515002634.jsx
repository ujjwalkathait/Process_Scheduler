// pages/Simulate.jsx
import React from 'react';
import SimulationControls from '../components/SimulationControls';
import InputTable from '../components/InputTable';
import ReadyQueue from '../components/ReadyQueue';
import CPUStatus from '../components/CPUStatus';
import StatsPanel from '../components/StatsPanel';
import NavigationButtons from '../components/NavigationButtons';
import ProcessList from '../components/ProcessList';
import GanttChart from '../components/GanttChart';
import { ProcessContext } from '../context/ProcessContext';

export default function Simulate() {
  const {
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
      setAnotherUpdatedProcesses
    } = useContext(ProcessContext);
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-black text-white min-h-screen">
      {/* Left Panel */}
      <div className="space-y-4 col-span-1">
        <SimulationControls />
        <InputTable />
        <ReadyQueue />
        <CPUStatus />
        <StatsPanel />
      </div>

      {/* Right Panel */}
      <div className="col-span-2 space-y-4">
        <NavigationButtons />
        <ProcessList />
        <GanttChart />
      </div>
    </div>
  );
}
