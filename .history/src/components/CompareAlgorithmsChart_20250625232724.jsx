import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


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
