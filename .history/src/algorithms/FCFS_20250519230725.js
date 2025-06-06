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




const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const executeFCFS = async (
  processes,
  num_of_processes,
  setUpdatedProcesses,
  setCurrentProcess,
  get
) => {
  let current_time = 0;
  const updated = processes.map(p => ({
    ...p,
    remainingTime: p.remainingTime ?? p.burstTime,
  }));

  for (let i = 0; i < num_of_processes; i++) {
    const p = updated[i];

    if (p.arrivalTime > current_time) {
      await delay((p.arrivalTime - current_time) * 1000);
      current_time = p.arrivalTime;
    }

    setCurrentProcess(p.processId);
    p.startTime = current_time;

    while (p.remainingTime > 0) {
      while (setIsPaused && setIsPaused()) {
        await delay(200); // pause loop
      }
      await delay(1000);
      p.remainingTime--;
      current_time++;
      setUpdatedProcesses([...updated]);
    }

    p.completionTime = current_time;
  }

  setCurrentProcess(null);
};

export default executeFCFS;
