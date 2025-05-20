
const executePreemptivePriority = (processes, num_of_processes, setUpdatedProcesses, setAnotherUpatedProcesses) => {
    const updatedProcesses = processes.sort((a, b) => a.priority - b.priority);

    let current_time = 0;
    let remaining_processes = num_of_processes;
    let updated_processes = [];
    const completed = new Array(num_of_processes).fill(false);

    while (remaining_processes > 0) {
        let highest_priority = Infinity;
        let highest_priority_index = -1;

        // Find the process with the highest priority that is ready to execute
        for (let i = 0; i < num_of_processes; i++) {
            const process = updatedProcesses[i];

            // Check if the process is not completed, arrived, and has higher priority
            if (!completed[i] && process.priority < highest_priority && process.arrivalTime <= current_time) {
                highest_priority = process.priority;
                highest_priority_index = i;
            }
        }

        if (highest_priority_index === -1) {
            current_time++;
            continue;
        }

        const current_process = updatedProcesses[highest_priority_index];

        // If the process has not started, update its start time
        if (current_process.startTime === undefined) {
            current_process.startTime = current_time;
        }

        // Execute the process for one time unit
        updated_processes.push({ ...current_process });
        current_process.remainingTime--;

        // If the process completes, calculate completion time and mark it as completed
        if (current_process.remainingTime === 0) {
            current_process.completionTime = current_time + 1;
            completed[highest_priority_index] = true;
            remaining_processes--;
        }

        current_time++;
    }

    // Update the state with the modified processes
    setUpdatedProcesses(updatedProcesses);
    setAnotherUpatedProcesses(updated_processes);
}

export default executePreemptivePriority;