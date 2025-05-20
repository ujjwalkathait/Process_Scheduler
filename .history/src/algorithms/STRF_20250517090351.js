const executeSTRF = (processes, num_of_processes, setUpdatedProcesses, setAnotherUpdatedProcesses, set) => {
    let current_time = 0;
    let remaining_processes = num_of_processes;
    let updated_processes = [];

    while (remaining_processes > 0) {
        let shortest_remaining_time = Infinity;
        let shortest_remaining_index = -1;

        // Find the process with the shortest remaining time
        for (let i = 0; i < num_of_processes; i++) {
            if (processes[i].arrivalTime <= current_time && processes[i].remainingTime < shortest_remaining_time && processes[i].remainingTime > 0) {
                shortest_remaining_time = processes[i].remainingTime;
                shortest_remaining_index = i;
            }
        }

        // If no process is available at current time, move to the next time unit
        if (shortest_remaining_index === -1) {
            current_time++;
            continue;
        }

        let current_process = processes[shortest_remaining_index];
        current_process.startTime = current_time;

        // Execute the process for one time unit
        current_time++;
        current_process.remainingTime--;
        updated_processes.push({ ...current_process });

        // If the process completes, update complete time and mark it as completed
        if (current_process.remainingTime === 0) {
            current_process.completionTime = current_time;
            updated_processes.push({ ...current_process });
            remaining_processes--;
        }
    }

    setUpdatedProcesses(processes);
    setAnotherUpdatedProcesses(updated_processes);
}

export default executeSTRF;

