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
  let solvedProcessesInfo = [];

  while (processesInfo.some((p) => !p.completed)) {
    let availableProcesses = processesInfo
      .filter((p) => !p.completed && p.at <= currentTime)
      .map((p) => ({
        ...p,
        rr: (currentTime - p.at + p.bt) / p.bt, // Response Ratio = (W + S) / S
      }));

    if (availableProcesses.length === 0) {
      currentTime++;
      continue;
    }

    // Select process with highest response ratio
    availableProcesses.sort((a, b) => b.rr - a.rr);
    const selectedProcess = availableProcesses[0];

    // Update current time and mark the process as completed
    const start = currentTime;
    const stop = currentTime + selectedProcess.bt;
    currentTime = stop;

    ganttChartInfo.push({
      job: selectedProcess.job,
      start,
      stop,
    });

    solvedProcessesInfo.push({
      ...processesInfo
      ft: stop,
      tat: stop - selectedProcess.at, // Turnaround time
      wat: stop - selectedProcess.at - selectedProcess.bt, // Waiting time
    });

    processesInfo.find((p) => p.job === selectedProcess.job)!.completed = true;
  }

  return { solvedProcessesInfo, ganttChartInfo };
};
