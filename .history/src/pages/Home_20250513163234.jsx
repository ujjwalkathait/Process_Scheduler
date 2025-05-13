import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SelectAlgorithm, ProcessData, ProcessTable } from '../components';

const Home = () => {
  const [arrivalTime, setArrivalTime] = useState();
    const [burstTime, setBurstTime] = useState();
    const [processId, setProcessID] = useState(1);
    const [processes, setProcesses] = useState([]);
    const [newProcesses, setUpdatedProcesses] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
    const [priority, setPriority] = useState();
    const [executed, setExecuted] = useState(false);
    const [statisticsData, setStatisticsData] = useState([]);
    const [updatedProcesses, setAnotherUpatedProcesses] = useState([]);
  
    let isNonPreemptive = (selectedAlgorithm === 1 || selectedAlgorithm === 2 || selectedAlgorithm === 3 || selectedAlgorithm === "");
    
    // Function to delete a process by processId
    const onDeleteProcess = (processIdToDelete) => {
      setProcesses(prevProcesses => {
        const updated = prevProcesses
          .filter(process => process.processId !== processIdToDelete)
          .map((process, index) => ({
            ...process,
            processId: index + 1 // Renumbering
          }));
        return updated;
      });
    };
  
    // Function to reset processes
    const onReset = () => {
      // reseting processes
      setExecuted(false);
      setProcesses([]); 
      setProcessID(1);
      setStatisticsData([]);
    }

  return (
    <div className="w-full bg-white my-6 flex flex-row gap-10">
      <div className="flex flex-row justify-evenly rounded-xl bg-slate-100 w-[480px] h-[46%] p-5">
        <SelectAlgorithm 
          selectedAlgorithm={selectedAlgorithm} 
          setSelectedAlgorithm={setSelectedAlgorithm}
        />
        <ProcessData 
          processId={processId}
          arrivalTime={arrivalTime} 
          burstTime={burstTime}
          priority={priority}
          setProcessID={setProcessID}
          processes={processes}
          setProcesses={setProcesses}
          setUpdatedProcesses={setUpdatedProcesses}
          setArrivalTime={setArrivalTime}
          setBurstTime={setBurstTime}
          setPriority={setPriority}
          selectedAlgorithm={selectedAlgorithm}
          setExecuted={setExecuted}
          setStatisticsData={setStatisticsData}
          setAnotherUpatedProcesses={setAnotherUpatedProcesses}
        />
      </div>
      
      <ProcessTable
        selectedAlgorithm={selectedAlgorithm}
        processes={processes}
        onDeleteProcess={onDeleteProcess}
        onReset={onReset}
      />
    </div>
  );
}

export default Home