const executeFCFS = (processes, num_of_processes, setUpdatedProcesses, setCurrentProcess) => {
    let current_time = 0;
    const newprocesses = [...processes];

    for (let i = 0; i < num_of_processes; i++) {
        if (newprocesses[i].arrivalTime > current_time)
            current_time = Number(newprocesses[i].arrivalTime);
        setCurrentProcess(newprocesses[i].processId);
        newprocesses[i].startTime = current_time;
        current_time += Number(newprocesses[i].burstTime);
        newprocesses[i].completionTime = current_time;

        newprocesses[i].remainingTime = 0;
        
    }
    setCurrentProcess(null);
    setUpdatedProcesses(newprocesses);
}
const executeFCFSSimulation = async (processes, setUpdatedProcesses, setCurrentProcess) => {
  
};

export default executeFCFS;
