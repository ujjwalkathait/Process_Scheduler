// src/components/NavigationButtons.jsx
import React, { useContext } from 'react';
import { ProcessContext } from '../context/ProcessContext';
import { useNavigate } from 'react-router-dom';

const NavigationButtons = ({ onStart, onReset , onAgain}) => {
  const navigate = useNavigate();
  const { isPaused, setIsPaused } = useContext(ProcessContext);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the simulation?")) {
      onReset();
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={onStart}
        className="reset bg-green-600 hover:bg-green-700 font-bold text-[1rem] text-center text-white px-[1.4rem] py-[0.4rem] mb-2 rounded-lg focus:outline-none"
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
        onClick={() => setIsPaused(prev => !prev)}
        className="reset bg-orange-600 hover:bg-orange-700 font-bold text-[1rem] text-center text-white px-[1.4rem] py-[0.4rem] mb-2 rounded-lg focus:outline-none"
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>

      <button
        className='reset bg-yellow-600 hover:bg-yellow-700 font-bold text-[1rem] text-center text-white px-[1.4rem] py-[0.4rem] mb-2 rounded-lg focus:outline-none'
        type="submit"
        onClick={handleReset}
      >
          Reset
      </button>


      <button
        className='reset bg-blue-600 hover:bg-blue-700 font-bold text-[1rem] text-center text-white px-[1.4rem] py-[0.4rem] mb-2 rounded-lg focus:outline-none'
        type="submit"
        onClick={onAgain}
      >
        Again
      </button>



      <button
        className={`reset bg-slate-500 hover:bg-slate-600  font-bold text-[0.9rem] text-center text-white px-[1.4rem] py-[0.4rem]  rounded-lg focus:outline-none`}
        type="submit"
        onClick={e => {
            e.preventDefault();
            navigate('/result');
        }}
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
