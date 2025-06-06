// const executeFCFS = (processes, num_of_processes, setUpdatedProcesses, setCurrentProcess) => {
//     let current_time = 0;
//     const newprocesses = [...processes];

//     for (let i = 0; i < num_of_processes; i++) {
//         if (newprocesses[i].arrivalTime > current_time)
//             current_time = Number(newprocesses[i].arrivalTime);
//         setCurrentProcess(newprocesses[i].processId);
//         newprocesses[i].startTime = current_time;
//         current_time += Number(newprocesses[i].burstTime);
//         newprocesses[i].completionTime = current_time;

//         newprocesses[i].remainingTime = 0;
        
//     }
//     setCurrentProcess(null);
//     setUpdatedProcesses(newprocesses);
// }

// export default executeFCFS;


// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const executeFCFS = async (processes, num_of_processes, setUpdatedProcesses, setCurrentProcess) => {
//   let current_time = 0;
//   const updated = [...processes];

//   for (let i = 0; i < num_of_processes; i++) {
//     const p = updated[i];

//     // Wait for arrival
//     if (p.arrivalTime > current_time) {
//       await delay((p.arrivalTime - current_time) * 1000);
//       current_time = p.arrivalTime;
//     }

//     setCurrentProcess(p.processId);
//     p.startTime = current_time;

//     while (p.remainingTime > 0) {
//       await delay(1000);
//       p.remainingTime--;
//       current_time++;
//       setUpdatedProcesses([...updated]);
//     }

//     p.completionTime = current_time;
//     setCurrentProcess(null);
//   }
// };
// export default executeFCFS; 




// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const executeFCFS = async (
//   processes,
//   num_of_processes,
//   setUpdatedProcesses,
//   setCurrentProcess,
//   getPaused
// ) => {
//   let current_time = 0;
//   const updated = processes.map(p => ({
//     ...p,
//     remainingTime: p.remainingTime ?? p.burstTime,
//   }));

//   for (let i = 0; i < num_of_processes; i++) {
//     const p = updated[i];

//     // Wait until process arrives
//     while (current_time < p.arrivalTime) {
//       if (getPaused()) {
//         await waitWhilePaused(getPaused);
//       }
//       await delay(1000);
//       current_time++;
//     }

//     p.startTime = current_time;
//     p.waitingTime = current_time - p.arrivalTime;
//     setCurrentProcess(p.processId);

//     // Execute process
//     while (p.remainingTime > 0) {
//       if (getPaused()) {
//         await waitWhilePaused(getPaused);
//       }

//       await delay(1000);
//       p.remainingTime--;
//       current_time++;
//       setUpdatedProcesses([...updated]); // trigger re-render
//     }

//     p.completionTime = current_time;
//     setCurrentProcess(null);
//   }

// };

// // Helper to pause while user clicks pause
// const waitWhilePaused = async (getPaused) => {
//   while (getPaused()) {
//     await delay(200);
//   }
// };

// export default executeFCFS;


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitWhilePaused = async (getPaused) => {
  while (getPaused()) {
    await delay(200);
  }
};

const executeFCFS = async (
  processes,
  num_of_processes,
  setUpdatedProcesses,
  setCurrentProcess,
  getPaused,
  isDelay,
) => {
  let current_time = 0;

  // Clone and prepare process list
  const live = [...processes].map((p) => ({
    ...p,
    remainingTime: p.remainingTime ?? p.burstTime,
    waitingTime: 0,
    startTime: null,
    completionTime: null,
  }));
  setUpdatedProcesses([...live]);

  const completed = [];

  while (completed.length < num_of_processes) {
    // Get ready (arrived) and incomplete processes
    const available = live
      .filter((p) => p.arrivalTime <= current_time && p.remainingTime > 0)
      .sort((a, b) =>  a.arrivalTime - b.arrivalTime);

    if (available.length === 0) {
      // No process ready, simulate idle CPU
      if (getPaused()) await waitWhilePaused(getPaused);
      await delay(isDelay);
      current_time++;
      continue;
    }

    const p = available[0]; // Shortest job selected

    // First time execution
    if (p.startTime === null) {
      p.startTime = current_time;
      p.waitingTime = current_time - p.arrivalTime;
    }

    setCurrentProcess(p.processId);

    // Run to completion (non-preemptive)
    while (p.remainingTime > 0) {
      if (getPaused()) await waitWhilePaused(getPaused);
      await delay(isDelay);
      p.remainingTime--;
      current_time++;
      setUpdatedProcesses([...live]); // Real-time UI update
    }

    p.completionTime = current_time;
    setCurrentProcess(null);
    completed.push(p);
    setUpdatedProcesses([...live]); // Final update for this process
  }

  // Final full state update
  setUpdatedProcesses([...live]);
};

export default executeFCFS;
