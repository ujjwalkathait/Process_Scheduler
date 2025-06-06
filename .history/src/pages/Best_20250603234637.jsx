import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProcessContext } from '../context/ProcessContext';
import compareAlgorithms from '../helpers/CompareAlgo';

const Best = () => {
  const { processes, setCurrentProcess, isPaused } = useContext(ProcessContext);
  const [bestAlgorithm, setBestAlgorithm] = useState(null);

  useEffect(() => {
    const runComparison = () => {
      const result = compareAlgorithms(processes);
      setBestAlgorithm(result.bestAlgorithm);

    runComparison();
  }, [processes]);


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Algorithm Comparison</h2>
      <p>Based on the current process data, the best algorithm is:</p>
      <p className="text-2xl font-semibold text-green-600 mt-2">
        {bestAlgorithm ? bestAlgorithm : 'Calculating...'}
      </p>
    </div>
  );
}

export default Best