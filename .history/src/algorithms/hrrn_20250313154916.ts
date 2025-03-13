import { ganttChartInfoType } from '.';

export const hrrn = (arrivalTime: number[], burstTime: number[]) => {
  const processesInfo = arrivalTime.map((item, index) => {
    const job =
      arrivalTime.length > 26
        ? `P${index + 1}`
        : (index + 10).toString(36).toUpperCase();

    return {
      job,
      at: item,
      bt: burstTime[index],
      completed: false,
    };
  });

  let finishTime: number[] = [];
  let ganttChartInfo: ganttChartInfoType = [];
  const solvedProcessesInfo = [];
  const readyQueue = [];

  let currentTime = 0;

  while (solvedProcessesInfo.length < processesInfo.length) {
    // Add available processes to the ready queue
    processesInfo.forEach((p) => {
      if (p.at <= currentTime && !p.completed && !readyQueue.includes(p)) {
        readyQueue.push(p);
      }
    });

    if (readyQueue.length === 0) {
      // If ready queue is empty, move to next available process
      const nextProcess = processesInfo.find((p) => !p.completed);
      if (nextProcess) {
        currentTime = nextProcess.at;
        readyQueue.push(nextProcess);
      }
    }

    // Calculate Response Ratio for all available processes
    const rqWithRR = readyQueue.map((p) => {
      const rr = (currentTime - p.at + p.bt) / p.bt;
      return { ...p, rr };
    });

    // Sort based on Highest Response Ratio
    rqWithRR.sort((a, b) => b.rr - a.rr);

    // Pick the process with the highest response ratio
    const processToExecute = rqWithRR[0];
    readyQueue.splice(
      readyQueue.findIndex((p) => p.job === processToExecute.job),
      1
    );

    // Execute the process
    const startTime = Math.max(currentTime, processToExecute.at);
    const stopTime = startTime + processToExecute.bt;
    currentTime = stopTime;

    ganttChartInfo.push({
      job: processToExecute.job,
      start: startTime,
      stop: stopTime,
    });

    // Update Finish Time
    finishTime.push(stopTime);

    // Mark as completed
    processToExecute.completed = true;

    // Calculate turnaround time and waiting time
    solvedProcessesInfo.push({
      ...processToExecute,
      ft: stopTime,
      tat: stopTime - processToExecute.at,
      wat: stopTime - processToExecute.at - processToExecute.bt,
    });
  }

  // Sort the solved info based on arrival time
  solvedProcessesInfo.sort((obj1, obj2) => {
    if (obj1.at > obj2.at) return 1;
    if (obj1.at < obj2.at) return -1;
    if (obj1.job > obj2.job) return 1;
    if (obj1.job < obj2.job) return -1;
    return 0;
  });

  return { solvedProcessesInfo, ganttChartInfo };
};
