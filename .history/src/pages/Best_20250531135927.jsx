import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProcessContext } from '../context/ProcessContext';
import compareAlgorithms from '../helpers/CompareAlgo';

const Best = async() => {
  const { processes, setCurrentProcess, isPaused } = useContext(ProcessContext);
  const [bestAlgorithm, setBestAlgorithm] = useState(null);

  const pausedRef = useRef(isPaused);
  
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  const getPaused = () => pausedRef.current;

  useEffect(() => {
    const result = await compareAlgorithms(processes, setCurrentProcess, getPaused);
    setBestAlgorithm(result);
  }, [processes]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Algorithm Comparison</h2>
      <p>Based on the current process data, the best algorithm is:</p>
      <p className="text-2xl font-semibold text-green-600 mt-2">{bestAlgorithm}</p>
    </div>
  );
}

export default Best