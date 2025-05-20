import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

// must match your selection indices
const ALGO_NAMES = [
  'FCFS',
  'SJF (Non‑Preemptive)',
  'Round Robin',
  'Priority (Non‑Preemptive)',
  'Priority (Preemptive)',
  'SJF (Preemptive)',
  'Multilevel Queue',
  'Custom'
];

const CPUStatus = () => {
  const { currentProcess, selectedAlgorithm } = useContext(ProcessContext);
  const alg = ALGO_NAMES[selectedAlgorithm] || 'Unknown';

  return (
    <div className="mt-4 border-2 border-green-500 bg-black text-white p-3 rounded-lg flex items-center space-x-6">
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
