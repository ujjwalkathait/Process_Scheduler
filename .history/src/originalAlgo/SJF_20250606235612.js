import executeFCFS from "./FCFS";

const executeSJF = (processes, num_of_processes, setUpdatedProcesses) => {
    const newprocesses = [...processes];
    // Sort processes based on burst time
    newprocesses.sort((a, b) => a.burstTime - b.burstTime);

    // Execute FCFS on sorted processes
    executeFCFS(newprocesses, num_of_processes, setUpdatedProcesses);
}

export default executeSJF;









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

    const p = available[0];

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