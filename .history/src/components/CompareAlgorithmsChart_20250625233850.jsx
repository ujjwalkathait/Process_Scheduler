import React, { useEffect, useState } from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts';

const CompareAlgorithmsChart = ({ metrics }) => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        if (metrics.length > 0) {
            let dataPoints = metrics.map((metric) => ({
                type: "spline",
                visible: true,
                showInLegend: true,
                yValueFormatString: "##.00 milliseconds",
                name: metric.algorithm,
                dataPoints: [
                    { label: "Average Completion Time", y: parseFloat(metric.average_completion_time) },
                    { label: "Average Waiting Time", y: parseFloat(metric.average_waiting_time) },
                    { label: "Average Turnaround Time", y: parseFloat(metric.average_turnaround_time) }
                ]
            }));

            setOptions({
                theme: "light2",
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: "CPU Scheduling Algorithms Comparison",
                    fontFamily: "sans-serif",
                    fontSize: 28,
                    fontWeight: "bold",
                    fontColor: "black"
                },
                axisY: {
                    title: "Time in milliseconds",
                    interval: 1
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer"
                },
                data: dataPoints
            });
        }
    }, [metrics]);

    return (
        <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
            {options && <CanvasJSChart options={options} />}
        </div>
    );
};

export default CompareAlgorithmsChart;


// import React from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// const formatMetricsForChart = (metrics) => {
//   const chartData = [
//     { name: 'Average Completion Time' },
//     { name: 'Average Waiting Time' },
//     { name: 'Average Turnaround Time' }
//   ];

//   metrics.forEach(metric => {
//     chartData[0][metric.algorithm] = parseFloat(metric.average_completion_time);
//     chartData[1][metric.algorithm] = parseFloat(metric.average_waiting_time);
//     chartData[2][metric.algorithm] = parseFloat(metric.average_turnaround_time);
//   });

//   return chartData;
// };

// const CompareAlgorithmsChart = ({ metrics }) => {
//   if (!metrics.length) return null;

//   const data = formatMetricsForChart(metrics);
//   const algorithmNames = Object.keys(data[0]).filter(key => key !== 'name');

//   return (
//     <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
//       <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
//         CPU Scheduling Algorithms Comparison
//       </h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis label={{ value: 'ms', angle: -90, position: 'insideLeft' }} />
//           <Tooltip />
//           <Legend />
//           {algorithmNames.map((algo, idx) => (
//             <Line key={algo} type="monotone" dataKey={algo} stroke={`hsl(${idx * 60}, 70%, 50%)`} />
//           ))}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CompareAlgorithmsChart;
