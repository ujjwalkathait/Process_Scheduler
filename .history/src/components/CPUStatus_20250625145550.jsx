import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

// must match your selection indices
const ALGO_NAMES = [
  'FCFS',
  'SJF (Non‑Preemptive)',
  'Priority (Non‑Preemptive)',
  'Priority (Preemptive)',
  'SJF (Preemptive)',
  'Round Robin',
  'Multilevel Queue',
  'Custom'
];

const CPUStatus = () => {
  const { currentProcess, selectedAlgorithm } = useContext(ProcessContext);
  const alg = ALGO_NAMES[selectedAlgorithm-1] || 'Unknown';

  return (
    <div className="mt-4 bg-gray-950 text-white p-3 rounded-lg flex items-center space-x-6">
      <div>
        <span className="font-semibold">CPU:</span>{' '}
        {currentProcess != null ? `P${currentProcess}` : 'Idle'}
      </div>
      <div>
        <span className="font-semibold">Algorithm:</span> {alg}
      </div>
    </div>
  );
};

export default CPUStatus;
