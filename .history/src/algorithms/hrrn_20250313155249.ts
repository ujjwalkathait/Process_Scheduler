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

  let currentTime = 0;
  let ganttChartInfo: ganttChartInfoType = [];
  const solvedProcessesInfo = [];

  while (processesInfo.some((p) => !p.completed)) {
    // Get available processes that have arrived by the current time
    let availableProcesses = processesInfo
      .filter((p) => p.at <= currentTime && !p.completed)
      .map((p) => ({
        ...p,
        rr: (currentTime - p.at + p.bt) / p.bt, // Calculate Response Ratio
      }));

    if (availableProcesses.length === 0) {
      // If no process is available, move to the next available process
      currentTime = Math.min(...processesInfo
        .filter((p) => !p.completed)
        .map((p) => p.at));
      continue;
    }

    // Sort available processes by highest response ratio
    availableProcesses.sort((a, b) => b.rr - a.rr);

    const processToExecute = availableProcesses[0];

    // Execute the selected process
    ganttChartInfo.push({
      job: processToExecute.job,
      start: currentTime,
      stop: currentTime + processToExecute.bt,
    });

    const finishTime = currentTime + processToExecute.bt;

    // Update solved process info
    solvedProcessesInfo.push({
      ...processToExecute,
      ft: finishTime,
      tat: finishTime - processToExecute.at,
      wat: finishTime - processToExecute.at - processToExecute.bt,
    });

    // Mark the process as completed
    processesInfo.find((p) => p.job === processToExecute.job)!.completed = true;

    // Update current time
    currentTime = finishTime;
  }

  // Sort results based on arrival time and job name for consistency
  solvedProcessesInfo.sort((a, b) => {
    if (a.at > b.at) return 1;
    if (a.at < b.at) return -1;
    if (a.job > b.job) return 1;
    if (a.job < b.job) return -1;
    return 0;
  });

  console.log({ solvedProcessesInfo, ganttChartInfo });

  return { solvedProcessesInfo, ganttChartInfo };
};
