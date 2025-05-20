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
        if (newprocesses[i].arrivalTime > current_time)
            current_time = Number(newprocesses[i].arrivalTime);
        setCurrentProcess(newprocesses[i].processId);
        newprocesses[i].startTime = current_time;
        current_time += Number(newprocesses[i].burstTime);
        newprocesses[i].completionTime = current_time;
        
    }
    setCurrentProcess(null);
    setUpdatedProcesses(newprocesses);
}

export default executeFCFS;
