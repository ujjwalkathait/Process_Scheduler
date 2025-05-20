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

        if (proc.arrivalTime > current_time) {
            current_time = Number(proc.arrivalTime);
        }

        setCurrentProcess(proc.processId);

        proc.startTime      = current_time;
        proc.waitingTime    = proc.startTime - proc.arrivalTime;
        current_time       += Number(proc.burstTime);
        proc.completionTime = current_time;

        proc.remainingTime  = 0;
    }
    setCurrentProcess(null);
    setUpdatedProcesses(newprocesses);
}

export default executeFCFS;
