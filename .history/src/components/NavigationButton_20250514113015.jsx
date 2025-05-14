import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavigationButtons({ onSimulate, onPause, onBack, onForward, onExit, onAgain }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={onPause} className="btn">Pause</button>
      <button onClick={onBack} className="btn">Back</button>
      <button onClick={() => { onSimulate(); /* then: */ navigate("/results"); }} className="btn">
        Simulate
      </button>
      <button onClick={onForward} className="btn">Forward</button>
      <button onClick={onExit} className="btn">Exit</button>
      <button onClick={onAgain} className="btn">Again</button>
    </div>
  );
}
