// import executeFCFS from "./FCFS";

// const executePriority = (processes, num_of_processes, setUpdatedProcesses, setCurrentProcess) => {
//     const newprocesses = [...processes];
//     // Sort processes based on priority
//     newprocesses.sort((a, b) => a.priority - b.priority);

//     // Execute FCFS on sorted processes
//     executeFCFS(newprocesses, num_of_processes, setUpdatedProcesses, setCurrentProcess);
// }

// export default executePriority;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitWhilePaused = async (getPaused) => {
  while (getPaused()) {
    await delay(200);
  }
};

const executePriority = async (
  processes,
  num_of_processes,
  setUpdatedProcesses,
  setCurrentProcess,
  getPaused
) => {
  let current_time = 0;
  let completed = 0;

  const updated = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    isCompleted: false,
  }));

  while (completed < num_of_processes) {
    // Get ready queue
    const readyQueue = updated
      .filter(p => !p.isCompleted && p.arrivalTime <= current_time)
      .sort((a, b) => a.priority - b.priority); // lower number = higher priority

    if (readyQueue.length === 0) {
      await delay(1000);
      current_time++;
      continue;
    }

    const current = readyQueue[0];
    current.startTime = current_time;
    current.waitingTime = current_time - current.arrivalTime;
    setCurrentProcess(current.processId);

    // Execute process fully (non-preemptive)
    while (current.remainingTime > 0) {
      if (getPaused()) await waitWhilePaused(getPaused);
      await delay(1000);
      current.remainingTime--;
      current_time++;
      setUpdatedProcesses([...updated]);
    }

    current.completionTime = current_time;
    current.isCompleted = true;
    setCurrentProcess(null);
    completed++;
  }
};

export default executePriority;

