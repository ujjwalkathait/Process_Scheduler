const computeStatistics = (selectedAlgorithm, processes, setProcesses) => {
    let isNonPreemptive = (selectedAlgorithm === 1 || selectedAlgorithm === 2 || selectedAlgorithm === 3 || selectedAlgorithm === "")
    let total_waiting_time = 0, total_completion_time = 0, total_turnaround_time = 0;
    let average_waiting_time = 0, average_completion_time = 0, average_turnaround_time = 0;
    
    for (let i = 0; i < processes.length; i++) {
        processes[i].waitingTime = processes[i].startTime - processes[i].arrivalTime;
        processes[i].turnaroundTime = processes[i].completionTime - processes[i].arrivalTime;

        total_waiting_time += processes[i].waitingTime;
        total_completion_time += processes[i].completionTime;
        total_turnaround_time += processes[i].turnaroundTime;
    }

    average_completion_time = (total_completion_time / processes.length).toFixed(2);
    average_waiting_time = (total_waiting_time / processes.length).toFixed(2);
    average_turnaround_time = (total_turnaround_time / processes.length).toFixed(2);

    setProcesses(processes);

    return { algorithm: selectedAlgorithm, average_completion_time, average_waiting_time, average_turnaround_time };
}

export default computeStatistics;

