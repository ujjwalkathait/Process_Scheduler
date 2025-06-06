import React from 'react'

const SelectAlgorithm = ({selectedAlgorithm, setSelectedAlgorithm}) => {
  return (
    <div className='w-2/3'>
      <h2 className='text-[1.4rem] mb-3 font-bold'>Select Algorithm</h2>
      <div className='flex flex-col gap-3 text-[0.9rem]'>
        <label>
          <input
            type="radio"
            value="fcfs"
            checked={selectedAlgorithm === 1}
            onChange={() => setSelectedAlgorithm(1)}
          />
          First-Come, First-Serve
        </label>
        <label>
          <input
            type="radio"
            value="sjf"
            checked={selectedAlgorithm === 2}
            onChange={() => setSelectedAlgorithm(2)}
          />
          Shortest Job First
        </label>
        <label>
          <input
            type="radio"
            value="priority"
            checked={selectedAlgorithm === 3}
            onChange={() => setSelectedAlgorithm(3)}
          />
          Priority Based
        </label>
        <label>
          <input
            type="radio"
            value="pp"
            checked={selectedAlgorithm === 4}
            onChange={() => setSelectedAlgorithm(4)}
          />
          Preemptive Priority
        </label>
        <label>
          <input
            type="radio"
            value="strf"
            checked={selectedAlgorithm === 5}
            onChange={() => setSelectedAlgorithm(5)}
          />
          Preemptive SJF (SRTF)
        </label>
        <label>
          <input
            type="radio"
            value="rr"
            checked={selectedAlgorithm === 6}
            onChange={() => setSelectedAlgorithm(6)}
          />
          Round Robin 
        </label>
        <label>
          <input
            type="radio"
            value="mlfq"
            checked={selectedAlgorithm === 7}
            onChange={() => setSelectedAlgorithm(7)}
          />
          Multilevel Feedback Queue
        </label>
      </div>
    </div>
  )
}

export default SelectAlgorithm;




import React, { useState } from 'react';

function Toggle() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>This text can be toggled.</p>}
    </div>
  );
}