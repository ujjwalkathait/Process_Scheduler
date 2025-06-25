import React, { useContext, useState } from 'react';
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
import ThemeToggle from './components/ThemeToggle';
function App() {  
  
  return (
    <Router>
      <div className="overflow-x-hidden mx-[5%] mb-[1rem]">
        <nav className="flex justify-center gap-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <div className="flex gap-8">
            <Link to="/" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">Home</Link>
            <Link to="/result" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">Result</Link>
            <Link to="/compare" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">Compare</Link>
            <Link to="/simulate" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">Simulate</Link>
            <Link to="/best" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">Best Algorithm</Link>
          </div>
          <div className='fle'>
            <ThemeToggle />
          </div>
        </nav>
        <div className='w-full text-center my-5'>
          <h1 className='text-[2rem] font-bold text-gray-800 dark:text-gray-100'>
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
  );
}

export default App



// import React from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { ProcessProvider } from './context/ProcessContext';
// import { ThemeProvider } from './context/ThemeContext';
// import ThemeToggle from './components/ThemeToggle';
// import Home from './pages/Home';
// import Result from './pages/Result';
// import Compare from './pages/Compare';
// import Simulate from './pages/Simulate';
// import Best from './pages/Best';

// export default function App() {
//   return (
//     <ThemeProvider>
//       <ProcessProvider>
//         <Router>
//           <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//             <nav className="flex justify-center items-center gap-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
//               <div className="flex gap-8">
//                 <Link to="/" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">
//                   Home
//                 </Link>
//                 <Link to="/result" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">
//                   Result
//                 </Link>
//                 <Link to="/compare" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">
//                   Compare
//                 </Link>
//                 <Link to="/simulate" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">
//                   Simulate
//                 </Link>
//                 <Link to="/best" className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">
//                   Best Algorithm
//                 </Link>
//               </div>
//               <ThemeToggle />
//             </nav>

//             <div className="w-full text-center my-5">
//               <h1 className="text-[2rem] font-bold text-gray-800 dark:text-gray-100">
//                 CPU Scheduling Simulator
//               </h1>
//             </div>

//             <ToastContainer />

//             <main className="flex-1 px-4 mb-4">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/result" element={<Result />} />
//                 <Route path="/compare" element={<Compare />} />
//                 <Route path="/simulate" element={<Simulate />} />
//                 <Route path="/best" element={<Best />} />
//               </Routes>
//             </main>
//           </div>
//         </Router>
//       </ProcessProvider>
//     </ThemeProvider>
//   );
// }