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
  getPaused
) => {
  const quantum_time = parseInt(prompt("Enter the Quantum Time:"));
  if (quantum_time <= 0 || quantum_time >= 10) {
    alert("Invalid Quantum Time. Please enter a valid number such that 0 < number <= 10.");
    return;
  }

  const updatedProcesses = processes.map(p => ({
    ...p,
    remainingTime: p.remainingTime ?? p.burstTime,
  }));

  let current_time = 0;
  let remaining_processes = num_of_processes;
  const executionLog = [];

  while (remaining_processes > 0) {
    let allProcessesCompleted = true;

    for (let i = 0; i < num_of_processes; i++) {
      let current_process = updatedProcesses[i];

      if (current_process.remainingTime > 0 && current_process.arrivalTime <= current_time) {
        allProcessesCompleted = false;

        if (current_process.remainingTime === current_process.burstTime) {
          current_process.startTime ??= current_time;
        }

        setCurrentProcess?.(current_process.processId);

        let execution_time = Math.min(current_process.remainingTime, quantum_time);

        for (let t = 0; t < execution_time; t++) {
          if (getPaused()) await waitWhilePaused(getPaused);
          await delay(1000);
          current_process.remainingTime--;
          current_time++;
          setUpdatedProcesses([...updatedProcesses]);
          executionLog.push({ ...current_process });

          if (current_process.remainingTime === 0) {
            current_process.completionTime = current_time;
            executionLog.push({ ...current_process });
            remaining_processes--;
            break;
          }
        }
      }
    }

    if (allProcessesCompleted) break;
  }

  setCurrentProcess?.(null);
  setUpdatedProcesses(updatedProcesses);
  setAnotherUpdatedProcesses(executionLog);
};

export default executeRoundRobin;
