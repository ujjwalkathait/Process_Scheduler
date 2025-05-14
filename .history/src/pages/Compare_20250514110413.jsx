/* src/pages/Compare.jsx */
import React, { useContext } from 'react';
import { CompareAlgorithmsChart } from '../components';
import { ProcessContext } from '../context/ProcessContext';

export default function Compare() {
  const { statisticsData } = useContext(ProcessContext);

  return (
    <></>
    <div className="w-full bg-white my-10 flex flex-row gap-5">
      <CompareAlgorithmsChart metrics={statisticsData} />
    </div>
  );
}
