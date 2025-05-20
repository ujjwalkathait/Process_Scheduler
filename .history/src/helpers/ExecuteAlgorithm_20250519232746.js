import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import computeStatistics from './ComputeStatistics';
import { executeFCFS, executeSJF, executePriority, executePreemptivePriority, executeSTRF, executeRoundRobin, executeMultilevelFeedbackQueue } from '../algorithms';

// Define constants for scheduling algorithms
const FCFS = 1;
const SJF = 2;
const PRIORITY = 3;
const PREEMPTIVE_PRIORITY = 4;
const STRF = 5;
const ROUND_ROBIN = 6;
const MULTILEVEL_FEEDBACK_QUEUE = 7;



const executeSelectedAlgorithm = async (selectedAlgorithm, num_of_processes, processes, setProcesses, setUpdatedProcesses, setExecuted, setStatisticsData, setAnotherUpdatedProcesses,setCurrentProcess, isPaused) => {
    if (processes.length === 0) {
        toast.error("Please, add process(s)");
        return;
    }

    let data;
    const getPaused = () => isPaused;

    switch (selectedAlgorithm) {
        case FCFS:
            await executeFCFS(processes, num_of_processes, setUpdatedProcesses,setCurrentProcess, getPaused);
            setExecuted(true);
            data = computeStatistics(selectedAlgorithm, processes, setProcesses);
            setStatisticsData(prevData => [...prevData, { algorithm: "FCFS", data }]);
            break;  
        case SJF:
            await executeSJF(processes, num_of_processes, setUpdatedProcesses, setCurrentProcess);
            setExecuted(true);
            data = computeStatistics(selectedAlgorithm, processes, setProcesses);
            setStatisticsData(prevData => [...prevData, { algorithm: "SJF", data }]);
            break;
        case PRIORITY:
            await executePriority(processes, num_of_processes, setUpdatedProcesses, setCurrentProcess);
            setExecuted(true);
            data = computeStatistics(selectedAlgorithm, processes, setProcesses);
            setStatisticsData(prevData => [...prevData, { algorithm: "PRIORITY", data }]);
            break;
        case PREEMPTIVE_PRIORITY:
            executePreemptivePriority(processes, num_of_processes, setUpdatedProcesses, setAnotherUpdatedProcesses, setCurrentProcess);
            setExecuted(true);
            data = computeStatistics(selectedAlgorithm, processes, setProcesses);
            setStatisticsData(prevData => [...prevData, { algorithm: "PRE_PRIORITY", data }]);
            break;
        case STRF:
            executeSTRF(processes, num_of_processes, setUpdatedProcesses, setAnotherUpdatedProcesses, setCurrentProcess);
            setExecuted(true);
            data = computeStatistics(selectedAlgorithm, processes, setProcesses);
            setStatisticsData(prevData => [...prevData, { algorithm: "STRF", data }]);
            break;
        case ROUND_ROBIN:
            executeRoundRobin(processes, num_of_processes, setUpdatedProcesses, setAnotherUpdatedProcesses, setCurrentProcess);
            setExecuted(true);
            data = computeStatistics(selectedAlgorithm, processes, setProcesses);
            setStatisticsData(prevData => [...prevData, { algorithm: "ROUND_ROBIN", data }]);
            break;
        case MULTILEVEL_FEEDBACK_QUEUE:
            executeMultilevelFeedbackQueue(processes, num_of_processes, setUpdatedProcesses, setAnotherUpdatedProcesses, setCurrentProcess);
            setExecuted(true);
            data = computeStatistics(selectedAlgorithm, processes, setProcesses);
            setStatisticsData(prevData => [...prevData, { algorithm: "MLFQ", data }]);
            break;
        default:
            toast.error("Please, select an algorithm");
    }
  }

export default executeSelectedAlgorithm;