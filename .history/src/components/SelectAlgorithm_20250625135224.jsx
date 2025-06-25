import React from 'react'

const SelectAlgorithm = ({selectedAlgorithm, setSelectedAlgorithm}) => {
  return (
    <div className='w-2/3 text-gray-900 dark:text-gray-100'>
      <h2 className='text-[1.4rem] mb-3 font-bold'>Select Algorithm</h2>
      <div className='flex flex-col gap-3 text-[0.9rem]'>
        <label>
          <input
            type="radio"
            value="fcfs"
            checked={selectedAlgorithm === 1}
            onChange={() => setSelectedAlgorithm(1)}
          />
          <span className='ml-2'>First-Come, First-Serve</span>
        </label>
        <label>
          <input
            type="radio"
            value="sjf"
            checked={selectedAlgorithm === 2}
            onChange={() => setSelectedAlgorithm(2)}
          />
          <span className='ml-2'>Shortest Job First</span>
        </label>
        <label>
          <input
            type="radio"
            value="priority"
            checked={selectedAlgorithm === 3}
            onChange={() => setSelectedAlgorithm(3)}
          />
          <span className='ml-2'>Priority Based</span>
        </label>
        <label>
          <input
            type="radio"
            value="pp"
            checked={selectedAlgorithm === 4}
            onChange={() => setSelectedAlgorithm(4)}
          />
          <span className='ml-2'>Preemptive Priority</span>
        </label>
        <label>
          <input
            type="radio"
            value="strf"
            checked={selectedAlgorithm === 5}
            onChange={() => setSelectedAlgorithm(5)}
          />
          <span className='ml-2'>Preemptive SJF (SRTF)</span>
        </label>
        <label>
          <input
            type="radio"
            value="rr"
            checked={selectedAlgorithm === 6}
            onChange={() => setSelectedAlgorithm(6)}
          />
          <span className='ml-2'>Round Robin </span>
        </label>
        <label>
          <input
            type="radio"
            value="mlfq"
            checked={selectedAlgorithm === 7}
            onChange={() => setSelectedAlgorithm(7)}
          />
          <span className='ml-2'>Multilevel Feedback Queue</span>
        </label>
      </div>
    </div>
  )
}

export default SelectAlgorithm;
