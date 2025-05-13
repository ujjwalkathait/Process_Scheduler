import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Compare from './pages/Compare';
import Home from './pages/Home';
import Result from './pages/Result';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  
  return (
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

    //   <div className='w-full bg-white my-10 flex flex-row gap-5 h-[46%]'>
    //     <GanttChartTable 
    //       selectedAlgorithm={selectedAlgorithm}
    //       processes={newProcesses}
    //       executed={executed}
    //     />
    //     <PerformanceMetrics 
    //       selectedAlgorithm={selectedAlgorithm}
    //       processes={processes}
    //       executed={executed}
    //     />
    //   </div>
      
    //   {executed ? 
    //     <div className='w-full bg-white my-10 flex flex-row gap-5'>
    //       <Statistics 
    //         selectedAlgorithm={selectedAlgorithm}
    //         processes={processes}
    //         setProcesses={setProcesses}
    //         executed={executed}
    //       /> 
    //       <GanttChart 
    //         processes={isNonPreemptive ? newProcesses : updatedProcesses}
    //         executed={executed}
    //         selectedAlgorithm={selectedAlgorithm}
    //       />
    //       {executed ? 
    //     <CompareAlgorithmsChart
    //       metrics={statisticsData}
    //     /> : ''
    //     }
    //     </div> : ''
        
    //   }
    // </div>
  );
}

export default App

