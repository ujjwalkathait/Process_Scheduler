import React from 'react';

 // Function to generate a deterministic color based on processId
 const getColorForProcessId = (processId) => {
    // Define an array of predefined colors
    const predefinedColors = [
        '#ff5733', // Red
        '#33ff57', // Green
        '#337aff', // Blue
        '#ff33d1', // Purple
        '#ffdb33', // Yellow
        '#33ffdb', // Cyan
        '#a233ff', // Violet
        '#f5a623', // Orange
        '#23f5a6'  // Aqua
        // Add more colors as needed
    ];

    // Use a hash function to map processId to an index in the predefinedColors array
    const index = processId % predefinedColors.length;
    return predefinedColors[index];
};

const GanttChart = ({ processes, executed, selectedAlgorithm }) => {
    let count = 0;
    let isNonPreemptive = (selectedAlgorithm === 1 || selectedAlgorithm === 2 || selectedAlgorithm === 3 || selectedAlgorithm === "");
    const colorMap = {};
    const size = processes.length;

    processes.forEach(process => {
        const { processId } = process;
        if (!colorMap[processId]) {
            colorMap[processId] = getColorForProcessId(processId); 
        }
        process.color = colorMap[processId]; 
    });

    return (
    <> 
        { executed && (
            <div className='w-full bg-gray-100 p-4 rounded-xl'>
                <h2 className='text-[1.4rem] my-5 font-bold text-center'>Processes Execution By The CPU</h2>
                <div className='flex flex-row justify-center'>
                    {processes.map(process => (
                        <div
                            key={process.processId}
                            style={{
                                width: `${isNonPreemptive? `${(process.completionTime - process.startTime) * (size > 4 ? 25 : 50)}px` : `${size > 4 ? 25 : 50}px`}`,
                                height: "100px",
                                backgroundColor: process.color,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                        </div>
                    ))}
                    
                </div>
                {
                    isNonPreemptive && (
                        <div className='flex flex-row justify-center'>
                            {processes.map((process,index) => {
                                const isLastBlock = index === processes.length - 1;
                                console.log(isLastBlock, index);
                                <div
                                    key={process.processId}
                                    style={{
                                        width: `${(process.completionTime - process.startTime) * (size > 4 ? 25 : 50)}px`,
                                        height: "30px",
                                        color: "black",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div className='text-[1rem] font-medium'>{`${process.startTime}`}</div>
                                    {/* <div className={`text-[1rem] font-medium ${count===processes.length ? 'block' : 'hidden'}`}>{`${process.completionTime}`}</div> */}
                                    {isLastBlock && (
                                        <div className='text-[0.8rem] font-medium'>{`${process.completionTime}`}</div>
                                    )}
                                </div>  
                            })} 
                        </div>
                    )
                }

                {
                    !isNonPreemptive && (
                        <div className='flex flex-row justify-center'>
                            {processes.map(process => (
                                count++,
                                <div
                                    key={process.processId}
                                    style={{
                                        width: `${isNonPreemptive? `${(process.completionTime - process.startTime) * (size > 4 ? 25 : 50)}px` : `${size > 4 ? 25 : 50}px`}`,
                                        height: "30px",
                                        color: "black",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div className='text-[0.8rem] font-medium'>{`${process.startTime}`}</div>
                                    <div className={`text-[0.8rem] font-medium ${count===processes.length? 'block' : 'hidden'}`}>{`${process.completionTime}`}</div>

                                </div>
                            ))} 
                        </div>
                    )
                }
                
                <div className='flex flex-row justify-center mt-10'>
                    {Object.entries(colorMap).map(([processId, color]) => (
                        <div key={processId} className={`flex flex-row justify-center items-center gap-2`}>
                            <div className={`${size > 5 ? 'text-[0.8rem]' : 'text-[1rem]'} font-medium`}>{`Process ${processId}`}</div>
                            <div
                                style={{width: `${size > 5 ? 16 : 20}px`,
                                height: `${size > 5 ? 16 : 20}px`,
                                backgroundColor: color,
                                display: "inline-block",
                                marginRight: "50px",
                             }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>)}
        </>
    );
};

export default GanttChart;
