import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}