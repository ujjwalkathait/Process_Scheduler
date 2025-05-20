const executeFCFS = (processes, num_of_processes, setUpdatedProcesses, setCurrentProcess) => {
    let current_time = 0;
  const newProcesses = [...processes];

  for (let i = 0; i < newProcesses.length; i++) {
    const process = newProcesses[i];

    // Wait for arrival
    if (process.arrivalTime > current_time) {
      await delay((process.arrivalTime - current_time) * 500); // simulate idle time
      current_time = process.arrivalTime;
    }

    process.startTime = current_time;
    setCurrentProcess(process.processId);

    while (process.remainingTime > 0) {
      await delay(500); // 1 unit time = 500ms (adjust as needed)
      process.remainingTime -= 1;
      current_time += 1;
      setUpdatedProcesses([...newProcesses]);
    }

    process.completionTime = current_time;
    setCurrentProcess(null);
  }

  setCurrentProcess(null);
}

export default executeFCFS;
