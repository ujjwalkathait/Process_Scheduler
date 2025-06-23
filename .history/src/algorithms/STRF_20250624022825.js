// const executeSTRF = (processes, num_of_processes, setUpdatedProcesses, setAnotherUpdatedProcesses, setCurrentProcess) => {
//     let current_time = 0;
//     let remaining_processes = num_of_processes;
//     let updated_processes = [];

//     while (remaining_processes > 0) {
//         let shortest_remaining_time = Infinity;
//         let shortest_remaining_index = -1;

//         // Find the process with the shortest remaining time
//         for (let i = 0; i < num_of_processes; i++) {
//             if (processes[i].arrivalTime <= current_time && processes[i].remainingTime < shortest_remaining_time && processes[i].remainingTime > 0) {
//                 shortest_remaining_time = processes[i].remainingTime;
//                 shortest_remaining_index = i;
//             }
//         }

//         // If no process is available at current time, move to the next time unit
//         if (shortest_remaining_index === -1) {
//             current_time++;
//             continue;
//         }

//         let current_process = processes[shortest_remaining_index];

//         setCurrentProcess?.(current_process.processId);
//         current_process.startTime = current_time;

//         // Execute the process for one time unit
//         current_time++;
//         current_process.remainingTime--;
//         updated_processes.push({ ...current_process });

//         // If the process completes, update complete time and mark it as completed
//         if (current_process.remainingTime === 0) {
//             current_process.completionTime = current_time;
//             updated_processes.push({ ...current_process });
//             remaining_processes--;
//         }
//     }
//     setCurrentProcess?.(null);
//     setUpdatedProcesses(processes);
//     setAnotherUpdatedProcesses(updated_processes);
// }

// export default executeSTRF;



const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitWhilePaused = async (getPaused) => {
  while (getPaused()) {
    await delay(200);
  }
};

const executeSTRF = async (
  processes,
  num_of_processes,
  setUpdatedProcesses,
  setAnotherUpdatedProcesses,
  setCurrentProcess,
  getPaused
) => {
  const updatedProcesses = processes.map(p => ({
    ...p,
    remainingTime: p.remainingTime ?? p.burstTime,
  }));

  let current_time = 0;
  let remaining_processes = num_of_processes;
  const executionLog = [];

  while (remaining_processes > 0) {
    let shortest_remaining_time = Infinity;
    let shortest_remaining_index = -1;

    for (let i = 0; i < num_of_processes; i++) {
      const p = updatedProcesses[i];
      if (
        p.arrivalTime <= current_time &&
        p.remainingTime > 0 &&
        p.remainingTime < shortest_remaining_time
      ) {
        shortest_remaining_time = p.remainingTime;
        shortest_remaining_index = i;
      }
    }

    if (shortest_remaining_index === -1) {
      setCurrentProcess?.(null);
      await delay(1000);
      current_time++;
      continue;
    }

    const current_process = updatedProcesses[shortest_remaining_index];

    if (current_process.remainingTime === current_process.burstTime) {
      current_process.startTime = current_time;
    }

    setCurrentProcess?.(current_process.processId);

    if (getPaused()) await waitWhilePaused(getPaused);

    await delay(delayRef.current);

    current_process.remainingTime--;
    current_time++;

    setUpdatedProcesses([...updatedProcesses]);
    executionLog.push({ ...current_process });

    if (current_process.remainingTime === 0) {
      current_process.completionTime = current_time;
      executionLog.push({ ...current_process });
      remaining_processes--;
    }
  }

  setCurrentProcess?.(null);
  setUpdatedProcesses(updatedProcesses);
  setAnotherUpdatedProcesses(executionLog);
};

export default executeSTRF;
