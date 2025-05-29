import React, { useContext, useEffect, useState } from 'react'
import { ProcessContext } from '../context/ProcessContext';

const Best = () => {
  const { processes } = useContext(ProcessContext);
  const [bestAlgorithm, setBestAlgorithm] = useState(null);

  useEffect(() => {
    const result = compareAlgorithms(processes);
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