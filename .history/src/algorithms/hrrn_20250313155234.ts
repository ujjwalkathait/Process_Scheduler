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
    ganttChartInfo
