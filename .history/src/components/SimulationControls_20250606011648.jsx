import React, { useEffect, useState } from 'react';

const SimulateControls = ({
  simulationSpeed,
  setSimulationSpeed,
  timeQuantum,
  setTimeQuantum,
  selectedAlgorithm,
  setDelay,
}) => {
    let usesPriority = (selectedAlgorithm === 6 || selectedAlgorithm === 7);
    
    useEffect(() => {
      setDelay(simulationSpeed * 1000);
    }, [simulationSpeed]);
  return (
    <div className="bg-gray-100 w-[400px] px-6 py-4 rounded-xl shadow-md">

      {/* Simulation Speed Slider */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Simulation Speed: {simulationSpeed.toFixed(1)}</label>
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.01"
          value={simulationSpeed}
          onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Quantum Time Input */}
      {usesPriority && (
        <div className="mb-4">
            <label className="block font-semibold mb-1">Quantum Time:</label>
            <input
            type="number"
            min="1"
            value={timeQuantum}
            onChange={(e) => setTimeQuantum(Number(e.target.value))}
            className="w-full p-2 border rounded"
            />
        </div>
      )}

      {/* Buttons */}
      {/* <div className="grid grid-cols-3 gap-4 mt-4">
        <button onClick={onPause} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded">
          Pause
        </button>
        <button onClick={onBack} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded">
          Back
        </button>
        <button onClick={onSimulate} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">
          Simulate
        </button>
        <button onClick={onForward} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">
          Forward
        </button>
        <button onClick={onExit} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded col-span-2">
          Exit
        </button>
      </div> */}
    </div>
  );
};

export default SimulateControls;
