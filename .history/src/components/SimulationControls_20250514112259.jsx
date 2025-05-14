import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SimulationControls({ speed, quantum, onSpeedChange, onQuantumChange }) {
  return (
    <div className="border-2 border-green-500 p-4 rounded-lg grid gap-4">
      <div>
        
        <label className="block text-sm">Simulation Speed:</label>
        <div className="flex items-center">
          <Slider
            min={0.01}
            max={1}
            step={0.01}
            value={speed}
            onChange={onSpeedChange}
            className="flex-1"
          />
          <span className="ml-2 w-12 text-center">{speed.toFixed(2)}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm">Quantum Time:</label>
        <div className="flex items-center">
          <Slider
            min={1}
            max={10}
            value={quantum}
            onChange={onQuantumChange}
            className="flex-1"
          />
          <span className="ml-2 w-6 text-center">{quantum}</span>
        </div>
      </div>
    </div>
  );
}
