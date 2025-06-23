// Define a Queue class to represent a queue with enqueue and dequeue operations
class Queue {
    constructor(capacity, algorithm) {
        this.items = [];
        this.front = 0;
        this.rear = -1;
        this.capacity = capacity;
        this.algorithm = algorithm;
    }

    enqueue(process) {
        if (this.isFull()) {
            console.log("Queue is full");
            return;
        }
        this.items.push(process);
        this.rear++;
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }
        return this.items[this.front++];
    }

    isEmpty() {
        return this.rear < this.front;
    }

    isFull() {
        return this.rear === this.capacity - 1;
    }
}

// Function to execute Multilevel Feedback Queue (MLFQ) algorithm
const executeMultilevelFeedbackQueue = (
    processes,
    num_of_processes,
    setUpdatedProcesses,
    setAnotherUpdatedProcesses,
    delayRef,
) => {
    const NUM_QUEUES = parseInt(prompt("Enter the number of queues:"));

    if (NUM_QUEUES === 0 || NUM_QUEUES > 5) {
        alert("Number of queues should be between 1 and 5.");
        return;
    }

    let current_time = 0;
    let updated_processes = [];

    // Initialize queues for different priority levels
    const queues = Array.from({ length: NUM_QUEUES }, () => new Queue(num_of_processes));

    // Assign scheduling algorithms to queues based on the number of queues
    for (let i = 0; i < NUM_QUEUES; i++) {
        if (i === NUM_QUEUES - 1) {
            queues[i].algorithm = 'FCFS'; // Last queue (queue with least priority) uses FCFS 
        } else {
            queues[i].algorithm = 'RR'; // Other queues (relatively with higher priority) use RR (Round Robin)
        }
    }

    // Enqueue all processes into the first queue
    processes.forEach((process) => {
        queues[0].enqueue(process);
    });

    // Process each queue level in order of priority
    for (let i = 0; i < NUM_QUEUES; i++) {
        const current_queue = queues[i];

        // Prompt for quantum time only if the current queue uses RR
        if (current_queue.algorithm === 'RR') {
            const quantum_time = parseInt(prompt(`Enter the Quantum Time for Queue ${i + 1}: `));

            // Process all the processes in the current RR queue
            while (!current_queue.isEmpty()) {
                const current_process = current_queue.dequeue();

                let execution_time = Math.min(current_process.remainingTime, quantum_time);

                current_process.startTime = current_time;
                current_time += execution_time;
                current_process.remainingTime -= execution_time;

                // If the process still has remaining time, enqueue it into the next queue
                if (current_process.remainingTime > 0) {
                    queues[i + 1].enqueue(current_process);
                    updated_processes.push({ ...current_process });
                }
                else if (current_process.remainingTime == 0) {
                    current_process.completionTime = current_time;
                    updated_processes.push({ ...current_process });
                }
            }
        } else if (current_queue.algorithm === 'FCFS') {
            // Process all the processes in the FCFS queue
            while (!current_queue.isEmpty()) {
                const current_process = current_queue.dequeue();

                current_process.startTime = current_time;
                current_time += current_process.remainingTime;
                current_process.completionTime = current_time;

                updated_processes.push({ ...current_process });
            }
        }
    }

    // Update state with the final updated_processes array
    setUpdatedProcesses([...processes]);
    setAnotherUpdatedProcesses([...updated_processes]);
};

export default executeMultilevelFeedbackQueue;
