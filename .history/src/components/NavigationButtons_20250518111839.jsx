// src/components/NavigationButtons.jsx
import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';

const NavigationButtons = ({ onStart, onReset }) => {
  const { processes } = useContext(ProcessContext);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the simulation?")) {
      onReset();
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={onStart}
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg border border-green-500 shadow"
      >
        Start Simulation
      </button>

      {/* <button
        onClick={handleReset}
        className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg border border-red-500 shadow"
      >
        Reset
      </button> */}

      <button
        className='reset bg-yellow-600 hover:bg-yellow-700 font-bold text-[1rem] text-center text-white px-[1.4rem] py-[0.4rem] mb-2 rounded-lg focus:outline-none'
        type="submit"
        onClick={handleReset}
      >
          Reset
      </button>

      <button
        className={`simulate bg-slate-500 hover:bg-slate-600  font-bold text-[0.9rem] text-center text-white p-[0.3rem] rounded-lg focus:outline-none`}
        type="submit"
        onClick={e => {
            e.preventDefault();
            if (processes.length === 0) {
                toast.error("Please add at least one process before proceeding.");
                return;
            }
            if (arrivalTime < 0 || burstTime < 0 || priority < 1) {
                toast.error("Please enter valid values for Arrival Time, Burst Time, and Priority.");
                return;
            }
            if (selectedAlgorithm === 3 || selectedAlgorithm === 4 || selectedAlgorithm === 7) {
                if (priority === "") {
                    toast.error("Please enter a valid priority value.");
                    return;
                }
            }
            if(selectedAlgorithm === 0){
                toast.error("Please select a algorithm.");
                return;
            }
            navigate('/simulate');
        }}
    >
        Next
    </button>
    </div>
  );
};

export default NavigationButtons;
