import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Compare from './pages/Compare';
import Home from './pages/Home';
import Result from './pages/Result';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProcessProvider } from './context/ProcessContext';
import Simulate from './pages/Simulate';
import Best from './pages/Best';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

function App() {
  
  return (
    <ProcessProvider>
      <ThemeProvider>
        <Router>
          <div className="overflow-x-hidden mx-[5%] mb-[1rem]">
            <nav className="flex justify-center gap-8 p-4 bg-slate-100 rounded-lg">
              <Link to="/" className="font-semibold hover:underline">Home</Link>
              <Link to="/result" className="font-semibold hover:underline">Result</Link>
              <Link to="/compare" className="font-semibold hover:underline">Compare</Link>
              <Link to="/simulate" className="font-semibold hover:underline">Simulate</Link>
              <Link to="/best" className="font-semibold hover:underline">Best Algorithm</Link>
            </nav>
            <div className='w-full text-center my-5'>
              <h1 className='text-[2rem] font-bold text-gray-800'>
                CPU Scheduling Simulator
              </h1>
            </div>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<Result />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/simulate" element={<Simulate />} />
              <Route path="/best" element={<Best />} />

            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </ProcessProvider>
  );
}

export default App

