// import computeStatistics from './ComputeStatistics';
// import {
//   executeFCFS,
//   executeSJF,
//   executePriority,
//   executePreemptivePriority,
//   executeSTRF,
//   executeRoundRobin,
//   executeMultilevelFeedbackQueue,
// } from '../algorithms/OriginalAlgo';

// // Constants for easier mapping
// const ALGORITHMS = [
//   { id: 1, name: "FCFS", execute: executeFCFS },
//   { id: 2, name: "SJF", execute: executeSJF },
//   { id: 3, name: "Priority", execute: executePriority },
//   { id: 4, name: "Preemptive Priority", execute: executePreemptivePriority },
//   { id: 5, name: "STRF", execute: executeSTRF },
//   { id: 6, name: "Round Robin", execute: executeRoundRobin },
//   { id: 7, name: "MLFQ", execute: executeMultilevelFeedbackQueue },
// ].filter(algo => [1, 2].includes(algo.id)); // use only FCFS and SJF for now


// const cloneProcesses = (processes) => {
//   return processes.map(p => ({ ...p }));
// };

// const compareAlgorithms = (processes, setUpdatedProcesses, setProcesses) => {
//   const results = [];

//   for (const algo of ALGORITHMS) {
//     const cloned = cloneProcesses(processes);

//     // Execute with pause and delay support
//     algo.execute(
//       cloned,
//       cloned.length,
//       setUpdatedProcesses,
//     );

//     // After execution, compute statistics
//     const stats = computeStatistics(algo.id, cloned, setProcesses);
//     results.push({ algorithm: algo.name, ...stats });
//   }

//   // Sort by average turnaround time (lower is better)
//  results.sort(
//     (a, b) => parseFloat(a.average_turnaround_time) - parseFloat(b.average_turnaround_time)
//   );


//   return {
//     bestAlgorithm: results[0].name,
//     allResults: results
//   };
//   // returns a sorted list, best first
// };

// export default compareAlgorithms;


import computeStatistics from './ComputeStatistics';
import {
  executeFCFS,
  executeSJF,
  executePriority,
  executePreemptivePriority,
  executeSTRF,
  executeRoundRobin,
  executeMultilevelFeedbackQueue,
} from '../algorithms/OriginalAlgo';

// Constants for easier mapping
const ALGORITHMS = [
  { id: 1, name: "FCFS", execute: executeFCFS },
  { id: 2, name: "SJF", execute: executeSJF },
  { id: 3, name: "Priority", execute: executePriority },
  { id: 4, name: "Preemptive Priority", execute: executePreemptivePriority },
  { id: 5, name: "STRF", execute: executeSTRF },
  { id: 6, name: "Round Robin", execute: executeRoundRobin },
  { id: 7, name: "MLFQ", execute: executeMultilevelFeedbackQueue },
].filter(algo => [1,2,3].includes(algo.id)); // compare only FCFS and SJF for now

// Clones process list to keep original unchanged
const cloneProcesses = (processes) => {
  return processes.map(p => ({ ...p }));
};

const dummySet = () => {};

const compareAlgorithms = (processes, setUpdatedProcesses, setProcesses) => {
  const results = [];

  for (const algo of ALGORITHMS) {
    const cloned = cloneProcesses(processes);

    // Simulate execution of scheduling algorithm
    algo.execute(cloned, cloned.length, dummySet);

    // Compute metrics like turnaround time, waiting time, etc.
    const stats = computeStatistics(algo.id, cloned, dummySet);
    results.push({ algorithm: algo.name, ...stats });
  }

  // Sort by best average turnaround time
  results.sort(
    (a, b) => parseFloat(a.average_turnaround_time) - parseFloat(b.average_turnaround_time)
  );

  return {
    bestAlgorithm: results[0].algorithm,
    allResults: results
  };
};

export default compareAlgorithms;
