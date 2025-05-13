import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Compare from './pages/Compare';
import Home from './pages/Home';
import Result from './pages/Result';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProcessProvider } from './context/ProcessContext';

function App() {
  
  return (
    <ProcessProvider>
      <Router>
        <div className="overflow-x-hidden mx-[5%] mb-[1rem]">
          <nav className="flex justify-center gap-8 p-4 bg-slate-100 rounded-lg">
            <Link to="/" className="font-semibold hover:underline">Home</Link>
            <Link to="/result" className="font-semibold hover:underline">Result</Link>
            <Link to="/compare" className="font-semibold hover:underline">Compare</Link>
          </nav>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </div>
      </Router>
    </ProcessProvider>

   
  );
}

export default App

