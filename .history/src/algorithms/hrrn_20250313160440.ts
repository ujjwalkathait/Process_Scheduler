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
    // Get all available processes that have arrived by current time and are not completed
    const availableProcesses = processesInfo
      .filter((p) => p.at <= currentTime && !p.completed)
      .map((p) => ({
        ...p,
        rr: (currentTime - p.at + p.bt) / p.bt, // Calculate Response Ratio
      }));

    if (availableProcesses.length === 0) {
      // If no process is available, move to the next available process arrival time
      currentTime = Math.min(
        ...processesInfo
          .filter((p) => !p.completed)
          .map((p) => p.at)
      );
      continue;
    }

    // Select the process with the highest response ratio
    availableProcesses.sort((a, b) => b.rr - a.rr);
    const processToExecute = availableProcesses[0];

    // Execute the selected process
    const startTime = currentTime;
    const finishTime = startTime + processToExecute.bt;

    ganttChartInfo.push({
      job: processToExecute.job,
      start: startTime,
      stop: finishTime,
    });

    solvedProcessesInfo.push({
      ...processToExecute,
      ft: finishTime,
      tat: finishTime - processToExecute.at,
      wat: finishTime - processToExecute.at - processToExecute.bt,
    });

    processesInfo.find((p) => p.job === processToExecute.job)!.completed = true;

    currentTime = finishTime;
  }

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
