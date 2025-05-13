import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProcessData, ProcessTable, SelectAlgorithm } from '../components';

const Home = () => {
  const [arrivalTime, setArrivalTime] = useState();
  const [burstTime, setBurstTime] = useState();
  const [processId, setProcessID] = useState(1);
  const [processes, setProcesses] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [priority, setPriority] = useState();

  const onDeleteProcess = id => {
    setProcesses(prev =>
      prev.filter(p => p.processId !== id)
        .map((p, idx) => ({ ...p, processId: idx + 1 }))
    );
  };

  const onReset = () => {
    setProcesses([]);
    setProcessID(1);
  };

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
          setArrivalTime={setArrivalTime}
          setBurstTime={setBurstTime}
          setPriority={setPriority}
          selectedAlgorithm={selectedAlgorithm}
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