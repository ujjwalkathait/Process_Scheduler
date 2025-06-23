// const executeRoundRobin = (processes, num_of_processes, setUpdatedProcesses, setAnotherUpdatedProcesses, setCurrentProcess) => {
//     const quantum_time = parseInt(prompt("Enter the Quantum Time:"));
//     if (quantum_time <= 0 || quantum_time >= 10) {
//         alert("Invalid Quantum Time. Please enter a valid number such that 0 < number <= 10.");
//         return;
//     }
    
//     let current_time = 0;
//     let remaining_processes = num_of_processes;
//     let updated_processes = [];

//     while (remaining_processes > 0) {
//         let allProcessesCompleted = true;

//         for (let i = 0; i < num_of_processes; i++) {
//             let current_process = processes[i];
//             if (current_process.remainingTime > 0) {
//                 allProcessesCompleted = false;
//                 setCurrentProcess?.(current_process.processId);
//                 current_process.startTime = current_time;

//                 // Execute the process for one quantum time or until it completes
//                 let execution_time = Math.min(current_process.remainingTime, quantum_time);

//                 // Check if the next process has arrived before executing full quantum time
//                 if (i < num_of_processes - 1) {
//                     let next_process = processes[i + 1];
//                     if (next_process.arrivalTime > current_time + execution_time) {
//                         // Next process has not arrived yet, execute current process till next arrival or completion
//                         execution_time += Math.min(current_process.remainingTime - execution_time, quantum_time);
//                         // execution_time = Math.min(next_process.arrivalTime - current_time, execution_time);
//                     }
//                 }
                
//                 current_time += execution_time;
//                 updated_processes.push({ ...current_process });
//                 current_process.remainingTime -= execution_time;
                

//                 // If the process completes, update completion time and mark it as completed
//                 if (current_process.remainingTime === 0) {
//                     current_process.completionTime = current_time;
//                     updated_processes.push({ ...current_process });
//                     remaining_processes--;
//                 }
//             }
//         }

//         // If all processes have remaining time <= 0, break out of the loop
//         if (allProcessesCompleted) {
//             break;
//         }
//     }
//     setCurrentProcess?.(null);

//     setUpdatedProcesses([...processes]); // Trigger state update
//     setAnotherUpdatedProcesses(updated_processes);
// };

// export default executeRoundRobin;




const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitWhilePaused = async (getPaused) => {
  while (getPaused()) {
    await delay(200);
  }
};

const executeRoundRobin = async (
  processes,
  num_of_processes,
  setUpdatedProcesses,
  setAnotherUpdatedProcesses,
  setCurrentProcess,
  getPaused,
  delayRef
) => {
  const quantum_time = parseInt(prompt("Enter the Quantum Time:"));
  if (isNaN(quantum_time) || quantum_time <= 0 || quantum_time > 10) {
    alert("Invalid Quantum Time. Please enter a number between 1 and 10.");
    return;
  }

  const updatedProcesses = processes.map((p) => ({
    ...p,
    remainingTime: p.remainingTime ?? p.burstTime,
    startTime: p.startTime ?? null,
  }));

  let current_time = 0;
  let remaining_processes = num_of_processes;
  const executionLog = [];
  const readyQueue = [];

  while (remaining_processes > 0) {
    // Add newly arrived processes to the ready queue
    for (let i = 0; i < num_of_processes; i++) {
      const p = updatedProcesses[i];
      if (p.arrivalTime === current_time && !readyQueue.includes(p)) {
        readyQueue.push(p);
      }
    }

    if (readyQueue.length === 0) {
      await delay(delayRef.current);
      current_time++;
      continue;
    }

    const current_process = readyQueue.shift();

    if (current_process.startTime === null) {
      current_process.startTime = current_time;
    }

    setCurrentProcess?.(current_process.processId);

    const exec_time = Math.min(current_process.remainingTime, quantum_time);
    for (let i = 0; i < exec_time; i++) {
      if (getPaused()) await waitWhilePaused(getPaused);
      await delay(10delayRef.current00);
      current_process.remainingTime--;
      current_time++;

      // Add new arrivals during execution
      for (let j = 0; j < num_of_processes; j++) {
        const newP = updatedProcesses[j];
        if (
          newP.arrivalTime === current_time &&
          !readyQueue.includes(newP) &&
          newP.remainingTime > 0
        ) {
          readyQueue.push(newP);
        }
      }

      executionLog.push({ ...current_process });
      setUpdatedProcesses([...updatedProcesses]);
    }

    if (current_process.remainingTime > 0) {
      readyQueue.push(current_process); // add back to queue if not finished
    } else {
      current_process.completionTime = current_time;
      remaining_processes--;
      executionLog.push({ ...current_process });
    }
  }

  setCurrentProcess?.(null);
  setUpdatedProcesses([...updatedProcesses]);
  setAnotherUpdatedProcesses(executionLog);
};

export default executeRoundRobin;
