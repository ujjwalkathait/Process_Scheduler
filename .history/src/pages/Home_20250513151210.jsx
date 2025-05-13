import React from 'react'

const Home = () => {
  return (
    <div>
      <h1 className='text-[2.4rem] font-bold text-center mt-8'>CPU Scheduling Algorithms Visualization</h1>
      <ToastContainer />
      <div className='w-full bg-white my-6 flex flex-row gap-10'>
        <div className='flex flex-row justify-evenly rounded-xl bg-slate-100 w-[480px] h-[46%] p-5'>
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
    </div>
  )
}

export default Home