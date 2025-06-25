import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProcessData = ({processId, arrivalTime, burstTime, priority, processes, setProcessID, setProcesses, setArrivalTime, setBurstTime, setPriority, selectedAlgorithm}) => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col w-1/3 text-gray-900 dark:text-gray-100'>
        <h2 className='text-[1.4rem] mb-3 font-bold'>Process Data</h2>
        <form className='flex flex-col gap-[0.85rem] text-[0.9rem]'>
            <label>
            Arrival Time:
            <input
                type="number"
                value={arrivalTime}
                onChange={e => setArrivalTime(Number(e.target.value))}
                min={0}
                className='ml-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded px-2 py-1'
            />
            </label>
            <label>
            Burst Time:
            <input
                type="number"
                value={burstTime}
                onChange={e => setBurstTime(Number(e.target.value))}
                min={0}
                className='ml-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded px-2 py-1'
            />
            </label>
            <label>
                Priority:
                <input
                type="number"
                value={priority}
                onChange={e => setPriority(Number(e.target.value))}
                min={1}
                
                />
            </label>

           <button 
                className='bg-green-700 text-[0.9rem] text-center text-white font-bold p-[0.3rem] hover:bg-green-800 focus:outline-none rounded-lg'
                type="submit"
                onClick={e => {
                    e.preventDefault();
                    setProcessID(processId + 1);

                    let created_process = { processId, arrivalTime: Number(arrivalTime),burstTime: Number(burstTime),priority: Number(priority), startTime: 0, completionTime: 0, remainingTime: Number(burstTime), waitingTime: 0};

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
                    if (processes.length === 0) {
                        toast.error("Please add at least one process before proceeding.");
                        return;
                    }
                    if (arrivalTime < 0 || burstTime < 0) {
                        toast.error("Please enter valid values for Arrival Time, Burst Time, and Priority.");
                        return;
                    }
                    if (selectedAlgorithm === 3 || selectedAlgorithm === 4 || selectedAlgorithm === 7) {
                        if (priority === "") {
                            toast.error("Please enter a valid priority value.");
                            return;
                        }
                    }
                    if(selectedAlgorithm === 0){
                        toast.error("Please select a algorithm.");
                        return;
                    }
                    navigate('/simulate');
                }}
            >
                Next
            </button>
        </form>
    </div>
  )
}

export default ProcessData