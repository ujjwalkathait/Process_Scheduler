// const executePreemptivePriority = (processes, num_of_processes, setUpdatedProcesses, setAnotherUpdatedProcesses, setCurrentProcess) => {
//     const updatedProcesses = processes;

//     let current_time = 0;
//     let remaining_processes = num_of_processes;
//     let updated_processes = [];
//     const completed = new Array(num_of_processes).fill(false);

//     while (remaining_processes > 0) {
//         let highest_priority = -Infinity;
//         let highest_priority_index = -1;

//         // Find the process with the highest priority that is ready to execute
//         for (let i = 0; i < num_of_processes; i++) {
//             const process = updatedProcesses[i];

//             // Check if the process is not completed, arrived, and has higher priority
//             if (!completed[i] && process.arrivalTime <= current_time) {
//                 if (process.priority > highest_priority) {
//                     highest_priority = process.priority;
//                     highest_priority_index = i;
//                 }
//                 if(process.priority === highest_priority) {
//                     if(highest_priority_index != -1 && process.arrivalTime < updatedProcesses[highest_priority_index].arrivalTime) {
//                         highest_priority = process.priority;
//                         highest_priority_index = i;
//                     }
//                     if(highest_priority_index != -1 && process.arrivalTime === updatedProcesses[highest_priority_index].arrivalTime){
//                         if(process.processId < updatedProcesses[highest_priority_index].processId) {
//                             highest_priority = process.priority;
//                             highest_priority_index = i;
//                         }
//                     }
//                 }
//             }
//         }

//         if (highest_priority_index === -1) {
//             setCurrentProcess?.(null);
//             current_time++;
//             continue;
//         }

//         const current_process = updatedProcesses[highest_priority_index];   

//         // If the process has not started, update its start time
//         if (current_process.remainingTime === current_process.burstTime) {
//             current_process.startTime = current_time;
//         }

//         // Execute the process for one time unit
//         current_process.remainingTime--;
//         setCurrentProcess?.(current_process.processId);
//         // If the process completes, calculate completion time and mark it as completed
//         if (current_process.remainingTime === 0) {
//             current_process.completionTime = current_time + 1;
//             completed[highest_priority_index] = true;
//             remaining_processes--;
//         }
        
//         updated_processes.push({ ...current_process });
//         current_time++;
//     }
//     setCurrentProcess?.(null);
//     // Update the state with the modified processes
//     setUpdatedProcesses([...updatedProcesses]);
//     setAnotherUpdatedProcesses(updated_processes);
// }

// export default executePreemptivePriority;


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const waitWhilePaused = async (getPaused) => {
  while (getPaused()) {
    await delay(200);
  }
};

const executePreemptivePriority = async (
  processes,
  num_of_processes,
  setUpdatedProcesses,
  setAnotherUpdatedProcesses,
  setCurrentProcess,
  getPaused,
  delayRef
) => {
  const updatedProcesses = processes.map(p => ({
    ...p,
    remainingTime: p.remainingTime ?? p.burstTime,
  }));

  let current_time = 0;
  let remaining_processes = num_of_processes;
  const completed = new Array(num_of_processes).fill(false);
  const executionLog = [];

  while (remaining_processes > 0) {
    let highest_priority = -Infinity;
    let highest_priority_index = -1;

    for (let i = 0; i < num_of_processes; i++) {
      const process = updatedProcesses[i];
      // if (!completed[i] && process.arrivalTime <= current_time) {
      //   if (process.priority > highest_priority) {
      //     highest_priority = process.priority;
      //     highest_priority_index = i;
      //   } else if (process.priority === highest_priority) {
      //     const currentHighest = updatedProcesses[highest_priority_index];
      //     if (
      //       process.arrivalTime < currentHighest.arrivalTime ||
      //       (process.arrivalTime === currentHighest.arrivalTime &&
      //         process.processId < currentHighest.processId)
      //     ) {
      //       highest_priority_index = i;
      //     }
      //   }
      // }

      if (!completed[i] && process.arrivalTime <= current_time) {
        if (process.priority > highest_priority) {
          highest_priority = process.priority;
          highest_priority_index = i;
        }
        if(process.priority === highest_priority) {
          if(highest_priority_index != -1 && process.arrivalTime < updatedProcesses[highest_priority_index].arrivalTime) {
            highest_priority = process.priority;
            highest_priority_index = i;
          }
          if(highest_priority_index != -1 && process.arrivalTime === updatedProcesses[highest_priority_index].arrivalTime){
            if(process.processId < updatedProcesses[highest_priority_index].processId) {
              highest_priority = process.priority;
              highest_priority_index = i;
            }
          }
        }
      }
    }

    if (highest_priority_index === -1) {
      setCurrentProcess(null);
      await delay(delayRef.current);
      current_time++;
      continue;
    }

    const current_process = updatedProcesses[highest_priority_index];

    if (current_process.remainingTime === current_process.burstTime) {
      current_process.startTime = current_time;
    }

    setCurrentProcess(current_process.processId);

    if (getPaused()) await waitWhilePaused(getPaused);

    await delay(1000);

    current_process.remainingTime--;
    current_time++;
    setUpdatedProcesses([...updatedProcesses]);

    executionLog.push({ ...current_process });

    if (current_process.remainingTime === 0) {
      current_process.completionTime = current_time;
      completed[highest_priority_index] = true;
      remaining_processes--;
    }
  }

  setCurrentProcess(null);
  setAnotherUpdatedProcesses(executionLog);
};

export default executePreemptivePriority;

