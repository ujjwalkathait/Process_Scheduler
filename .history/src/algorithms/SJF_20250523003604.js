// import executeFCFS from "./FCFS";

// const executeSJF = (processes, num_of_processes, setUpdatedProcesses, setCurrentProcess) => {
//     const newprocesses = [...processes];
//     // Sort processes based on burst time
//     newprocesses.sort((a, b) => a.burstTime - b.burstTime);

//     // Execute FCFS on sorted processes
//     executeFCFS(newprocesses, num_of_processes, setUpdatedProcesses, setCurrentProcess);
// }

// export default executeSJF;


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitWhilePaused = async (getPaused) => {
  while (getPaused()) {
    await delay(200);
  }
};

const executeSJF = async (
  processes,
  num_of_processes,
  setUpdatedProcesses,
  setCurrentProcess,
  getPaused
) => {
  let current_time = 0;

  // Deep copy to avoid mutation
  const live = processes.map((p) => ({
    ...p,
    remainingTime: p.remainingTime ?? p.burstTime,
    waitingTime: 0,
    startTime: null,
    completionTime: null,
  }));
  setUpdatedProcesses([...live]);

  const completed = [];

  while (completed.length < num_of_processes) {
    // Filter arrived and incomplete
    const available = live
      .filter((p) => p.arrivalTime <= current_time && p.remainingTime > 0)
      .sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);

    if (available.length === 0) {
      // CPU idle
      if (getPaused()) await waitWhilePaused(getPaused);
      await delay(1000);
      current_time++;
      continue;
    }

    const p = available[0];
    if (p.startTime === null) {
      p.startTime = current_time;
      p.waitingTime = current_time - p.arrivalTime;
    }

    setCurrentProcess(p.processId);

    while (p.remainingTime > 0) {
      if (getPaused()) await waitWhilePaused(getPaused);
      await delay(1000);
      p.remainingTime--;
      current_time++;
      setUpdatedProcesses([...live]);
    }
    p.completionTime = current_time;
    setCurrentProcess(null);
    completed.push(p);
    setUpdatedProcesses([...live]);
  }
  // Final update
  setUpdatedProcesses([...live]);
};
export default executeSJF;



// import executeFCFS from './FCFS';

// const executeSJF = async (
//   processes,
//   num_of_processes,
//   setUpdatedProcesses,
//   setCurrentProcess,
//   getPaused
// ) => {
//   const sorted = [...processes].sort((a, b) => {
//     if (a.arrivalTime !== b.arrivalTime) {
//       return a.arrivalTime - b.arrivalTime;
//     }
//     return a.burstTime - b.burstTime;
//   });

//   await executeFCFS(sorted, num_of_processes, setUpdatedProcesses, setCurrentProcess, getPaused);
// };

// export default executeSJF;

