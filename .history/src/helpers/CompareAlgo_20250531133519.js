import computeStatistics from './ComputeStatistics';
import {
  executeFCFS
} from '../algorithms';

// Constants for easier mapping
const ALGORITHMS = [
  { id: 1, name: "FCFS", execute: executeFCFS },
  { id: 2, name: "SJF", execute: executeSJF },
  { id: 3, name: "Priority", execute: executePriority },
  { id: 4, name: "Preemptive Priority", execute: executePreemptivePriority },
  { id: 5, name: "STRF", execute: executeSTRF },
  { id: 6, name: "Round Robin", execute: executeRoundRobin },
  { id: 7, name: "MLFQ", execute: executeMultilevelFeedbackQueue }
];

const cloneProcesses = (processes) => {
  return processes.map(p => ({ ...p }));
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const compareAlgorithms = async (processes, setCurrentProcess, getPaused) => {
  const results = [];

  for (const algo of ALGORITHMS) {
    const cloned = cloneProcesses(processes);

    const dummySet = () => {};
    const dummySetArray = (arr) => {};

    // Execute with pause and delay support
    await algo.execute(
      cloned,
      cloned.length,
      dummySetArray,        // setUpdatedProcesses
      dummySetArray,        // setAnotherUpdatedProcesses
      setCurrentProcess,    // setCurrentProcess
      getPaused             // pause support
    );

    // After execution, compute statistics
    const stats = computeStatistics(algo.id, cloned, dummySetArray);
    results.push({ algorithm: algo.name, ...stats });
  }

  // Sort by average turnaround time (lower is better)
  results.sort((a, b) => a.average_turnaround_time - b.average_turnaround_time);

  return results;  // returns a sorted list, best first
};

export default compareAlgorithms;
