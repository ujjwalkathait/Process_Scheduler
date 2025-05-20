import executeFCFS from "./FCFS";

const executePriority = (processes, num_of_processes, setUpdatedProcesses) => {
    const newprocesses = [...processes];
    // Sort processes based on priority
    newprocesses.sort((a, b) => a.priority - b.priority);

    // Execute FCFS on sorted processes
    executeFCFS(newprocesses, num_of_processes, setUpdatedProcesses);
}

export default executePriority;
