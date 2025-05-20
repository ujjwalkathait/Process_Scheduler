// src/components/NavigationButtons.jsx
import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

const NavigationButtons = ({ onStart, onReset }) => {
  const { processes } = useContext(ProcessContext);

  const handleStart = () => {
    if (processes.length === 0) {
      alert("Please enter at least one process before starting.");
      return;
    }
    onStart();
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the simulation?")) {
      onReset();
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={handleStart}
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg border border-green-500 shadow"
      >
        Start Simulation
      </button>

      <button
        onClick={handleReset}
        className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg border border-red-500 shadow"
      >
        Reset
      </button>
      
    </div>
  );
};

export default NavigationButtons;
