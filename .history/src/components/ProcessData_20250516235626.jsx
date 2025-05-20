import React from 'react'
import { useNavigate } from 'react-router-dom';
import executeSelectedAlgorithm from '../helpers/ExecuteAlgorithm';

const ProcessData = ({processId, arrivalTime, burstTime, priority, processes, setProcessID, setProcesses, setUpdatedProcesses, setArrivalTime, setBurstTime, setPriority, selectedAlgorithm, setExecuted, setStatisticsData, setAnotherUpdatedProcesses}) => {
    let num_of_process = processes.length;
    const navigate = useNavigate();
  return (
    <div className='flex flex-col w-1/3'>
        <h2 className='text-[1.4rem] mb-3 font-bold'>Process Data</h2>
        <form className='flex flex-col gap-[0.85rem] text-[0.9rem]'>
            <label>
            Arrival Time:
            <input
                type="number"
                value={arrivalTime}
                onChange={e => setArrivalTime(e.target.value)}
                min={0}
            />
            </label>
            <label>
            Burst Time:
            <input
                type="number"
                value={burstTime}
                onChange={e => setBurstTime(e.target.value)}
                min={0}
            />
            </label>
            <label>
                Priority:
                <input
                type="number"
                value={priority}
                onChange={e => setPriority(e.target.value)}
                min={1}
                />
            </label>

           <button 
                className='bg-green-700 text-[0.9rem] text-center text-white font-bold p-[0.3rem] hover:bg-green-800 focus:outline-none rounded-lg'
                type="submit"
                onClick={e => {
                    e.preventDefault();
                    setProcessID(processId + 1);
                    let arrivalTime1 = parseInt(arrivalTime);
                    let burstTime = parseInt(burstTime);

                    let created_process = { processId, arrivalTime, burstTime, priority, startTime: 0, completionTime: 0, remainingTime: burstTime};
                    console.log(created_process);

                    setProcesses([...processes, created_process]);
                }}
            >
                Add Process
            </button>
            <button
                className={`simulate bg-slate-500 hover:bg-slate-600  font-bold text-[0.9rem] text-center text-white p-[0.3rem] rounded-lg focus:outline-none`}
                type="submit"
                onClick={e => {
                    e.preventDefault();
                    executeSelectedAlgorithm(selectedAlgorithm, num_of_process, processes, setProcesses, setUpdatedProcesses, setExecuted, setStatisticsData, setAnotherUpdatedProcesses);
                    // navigate('/simulate');
                }}
            >
                Simulate
            </button>
        </form>
    </div>
  )
}

export default ProcessData