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
  getPaused
) => {
  let current_time = 0;
  const updated = processes.map(p => ({
  ...p,
  remainingTime: p.burstTime,
}));;

  for (let i = 0; i < num_of_processes; i++) {
    const p = updated[i];

    // Wait until process arrives
    while (current_time < p.arrivalTime) {
      if (getPaused()) {
        await waitWhilePaused(getPaused);
      }
      await delay(1000);
      current_time++;
    }

    p.startTime = current_time;
    setCurrentProcess(p.processId);

    // Execute process
    while (p.remainingTime > 0) {
      if (getPaused()) {
        await waitWhilePaused(getPaused);
      }

      await delay(1000);
      p.remainingTime--;
      current_time++;
      setUpdatedProcesses([...updated]); // trigger re-render
    }

    p.completionTime = current_time;
    setCurrentProcess(null);
  }

};

// Helper to pause while user clicks pause
const waitWhilePaused = async (getPaused) => {
  while (getPaused()) {
    await delay(200);
  }
};

export default executeFCFS;
