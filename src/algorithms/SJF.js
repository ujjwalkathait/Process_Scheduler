import executeFCFS from "./FCFS";

const executeSJF = (processes, num_of_processes, setUpdatedProcesses) => {
    const newprocesses = [...processes];
    // Sort processes based on burst time
    newprocesses.sort((a, b) => a.burstTime - b.burstTime);

    // Execute FCFS on sorted processes
    executeFCFS(newprocesses, num_of_processes, setUpdatedProcesses);
}

export default executeSJF;
