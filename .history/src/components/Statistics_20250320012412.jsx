import React from 'react';
import computeStatistics from '../helpers/ComputeStatistics';

const Statistics = ({selectedAlgorithm, processes, setProcesses, executed }) => {
    const statiticsData = computeStatistics(selectedAlgorithm, processes, setProcesses);
    return (
        <div className='w-[500px] bg-gray-100 px-4 py-4 rounded-xl'>
            { executed && processes.length !== 0 && (
                <>
                    <h2 className='text-[1.4rem] my-5 font-bold text-center'>Statistics</h2>
                    <div className="w-full text-center">
                        <div className="bg-white">
                        
                            <div className="border border-gray-300 px-4 py-1">
                                <h2 className='text-[0.8rem] mb-2 font-medium text-center'>Average Completion Time</h2>
                                <p className='text-[1.2rem] mb-2 font-bold text-center'>
                                    {statiticsData.average_completion_time}<span className='text-[0.8rem] font-normal'>ms</span>
                                </p>
                            </div>

                            <div className="border border-gray-300 px-4 py-1">
                                <h2 className='text-[0.8rem] mb-2 font-medium text-center'>Average Waiting Time</h2>
                                <p className='text-[1.2rem] mb-2 font-bold text-center'>
                                    {statiticsData.average_waiting_time}<span className='text-[0.8rem] font-normal'>ms</span>
                                </p>
                            </div>
                
                            <div className="border border-gray-300 px-4 py-1">
                                <h2 className='text-[0.8rem] mb-2 font-medium text-center'>Average Turnaround Time</h2>
                                <p className='text-[1.2rem] mb-2 font-bold text-center'>
                                    {statiticsData.average_turnaround_time}<span className='text-[0.8rem] font-normal'>ms</span>
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Statistics;
