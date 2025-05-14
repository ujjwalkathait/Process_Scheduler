import React, { useState } from 'react';
import SimulationControls from '../components/SimulationControls';
import InputTable from '../components/InputTable';
import ReadyQueue from '../components/ReadyQueue';
import { CPUStatus, StatsPanel } from '../components/CPUStatus';
import ProcessList from '../components/ProcessList';
import GanttChart from '../components/GanttChart';
import NavigationButtons from '../components/NavigationButtons';

export default function Simu() {
  // state hooks
  const [speed, setSpeed] = useState(0.1);
  const [quantum, setQuantum] = useState(3);
  const [processes, setProcesses] = useState([
    { id: 'P1', arrival: 0, burst: 4, priority: 0 },
    /* … up to 10 rows … */
  ]);
  const [queue, setQueue] = useState([]);
  const [cpuStatus, setCpuStatus] = useState('Idle');
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [stats, setStats] = useState({ wait:0, turn:0, total:0 });
  const [timeline, setTimeline] = useState([]);
  // … handlers for updates, simulation, etc …

  return (
    <div className="p-4 grid grid-cols-3 gap-4 bg-black text-white min-h-screen">
      <div className="col-span-1 space-y-4">
        <SimulationControls
          speed={speed}
          quantum={quantum}
          onSpeedChange={setSpeed}
          onQuantumChange={setQuantum}
        />
        <InputTable
          processes={processes}
          onUpdateProcess={(i,k,v)=>{/*update logic*/}}
        />
        <ReadyQueue queue={queue} />
        <div className="space-y-2">
          <CPUStatus status={cpuStatus} algorithm={algorithm}/>
          <StatsPanel stats={stats}/>
        </div>
      </div>

      <div className="col-span-2 space-y-4">
        <NavigationButtons
          onPause={()=>{}}
          onBack={()=>{}}
          onSimulate={()=>{/*run simulation*/}}
          onForward={()=>{}}
          onExit={()=>{}}
          onAgain={()=>{}}
        />

        <div className="flex space-x-4">
          <ProcessList processes={processesWithProgress} />
          <GanttChart timeline={timeline} />
        </div>
      </div>
    </div>
  );
}
