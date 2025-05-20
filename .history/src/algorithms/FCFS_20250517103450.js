const executeFCFS = (processes, num_of_processes, setUpdatedProcesses, setCurrentProcess) => {
    let current_time = 0;
    const newprocesses = processes.map(p => ({
        ...p,
        remainingTime:  p.burstTime,
        waitingTime:    0,
        startTime:      null,
        completionTime: null,
    }));

    for (let i = 0; i < num_of_processes; i++) {
    const proc = newprocesses[i];

    // If CPU is idle, jump to arrival:
    if (proc.arrivalTime > current_time) {
      current_time = Number(proc.arrivalTime);
    }

    // 3) Highlight this process in UI:
    setCurrentProcess(proc.processId);

    // 4) Compute timings:
    proc.startTime      = current_time;
    proc.waitingTime    = proc.startTime - proc.arrivalTime;
    current_time       += Number(proc.burstTime);
    proc.completionTime = current_time;

    // 5) It ran to completion:
    proc.remainingTime  = 0;
  }
    setCurrentProcess(null);
    setUpdatedProcesses(newprocesses);
}

export default executeFCFS;
