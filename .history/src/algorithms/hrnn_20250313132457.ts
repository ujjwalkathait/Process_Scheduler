import { ganttChartInfoType } from ".";

export const hrrn = (arrivalTime: number[], burstTime: number[]) => {
  const processesInfo = arrivalTime
    .map((item, index) => ({
      const job: arrivalTime.length > 26 ? P${index + 1} : (index + 10).toString(36).toUpperCase():

      return {

          at: item,
          bt: burstTime[index],
          completed: false,
      }
    }))
    .sort((obj1, obj2) => obj1.at - obj2.at);

  let currentTime = 0;
  let ganttChartInfo: ganttChartInfoType = [];
  let solvedProcessesInfo: any[] = [];

  while (solvedProcessesInfo.length < arrivalTime.length) {
    let availableProcesses = processesInfo
      .filter(p => !p.completed && p.at <= currentTime)
      .map(p => ({
        ...p,
        responseRatio: (currentTime - p.at + p.bt) / p.bt,
      }))
      .sort((a, b) => b.responseRatio - a.responseRatio);

    if (availableProcesses.length === 0) {
      currentTime++;
      continue;
    }

    let process = availableProcesses[0];
    let index = processesInfo.findIndex(p => p.job === process.job);

    ganttChartInfo.push({ job: process.job, start: currentTime, stop: currentTime + process.bt });
    currentTime += process.bt;

    processesInfo[index].completed = true;
    solvedProcessesInfo.push({
      ...process,
      ft: currentTime,
      tat: currentTime - process.at,
      wat: currentTime - process.at - process.bt,
    });
  }

  return { solvedProcessesInfo, ganttChartInfo };
};