#include <iostream>
#include <queue>
#include <vector>
#include <iomanip>
#include <algorithm>

using namespace std;

struct Process
{
    int id, at, bt, remaining_bt, st, ct, tat, wt, rt, queue_level;
    bool started = false;
};

void mlfqScheduling(vector<Process> &processes, vector<int> timeQuantums)
{
    int n = processes.size(), completed = 0, currentTime = 0, totalIdleTime = 0;
    float totalTAT = 0, totalWT = 0, totalRT = 0;
    vector<queue<int>> queues(timeQuantums.size()); // Multiple queues
    vector<bool> inQueue(n, false);

    // Sort by Arrival Time
    sort(processes.begin(), processes.end(), [](const Process &a, const Process &b)
         { return a.at < b.at; });

    int nextProcess = 0;
    cout << "\nGantt Chart:\n|";

    while (completed < n)
    {
        // Push newly arrived processes into the highest priority queue
        while (nextProcess < n && processes[nextProcess].at <= currentTime)
        {
            queues[0].push(nextProcess);
            inQueue[nextProcess] = true;
            nextProcess++;
        }

        bool executed = false;

        for (int level = 0; level < timeQuantums.size(); level++)
        {
            if (!queues[level].empty())
            {
                int idx = queues[level].front();
                queues[level].pop();
                inQueue[idx] = false;

                if (!processes[idx].started)
                {
                    processes[idx].st = currentTime;
                    processes[idx].rt = processes[idx].st - processes[idx].at;
                    processes[idx].started = true;
                }

                int execTime = min(timeQuantums[level], processes[idx].remaining_bt);
                cout << " P" << processes[idx].id << " |";
                processes[idx].remaining_bt -= execTime;
                currentTime += execTime;

                if (processes[idx].remaining_bt == 0)
                { // Process completes
                    processes[idx].ct = currentTime;
                    processes[idx].tat = processes[idx].ct - processes[idx].at;
                    processes[idx].wt = processes[idx].tat - processes[idx].bt;
                    totalTAT += processes[idx].tat;
                    totalWT += processes[idx].wt;
                    totalRT += processes[idx].rt;
                    completed++;
                }
                else
                { // Move process to the next queue level
                    if (level + 1 < timeQuantums.size())
                    {
                        queues[level + 1].push(idx);
                        inQueue[idx] = true;
                    }
                    else
                    { // Remain in the last queue (FCFS)
                        queues[level].push(idx);
                        inQueue[idx] = true;
                    }
                }

                executed = true;
                break;
            }
        }

        if (!executed)
        { // If no process is ready, CPU is idle
            cout << " IDLE |";
            currentTime++;
            totalIdleTime++;
        }
    }

    // CPU Utilization Calculation
    int totalTime = processes[n - 1].ct - processes[0].at;
    float cpuUtilization = ((totalTime - totalIdleTime) / (float)totalTime) * 100;

    // Gantt Chart Completion
    cout << "\n0 ";
    for (auto &p : processes)
        cout << setw(4) << p.ct << " ";

    // Output Table
    cout << "\n\nMultilevel Feedback Queue (MLFQ) Scheduling Results:\n";
    cout << "---------------------------------------------------------------\n";
    cout << "PID\tAT\tBT\tST\tCT\tTAT\tWT\tRT\n";
    cout << "---------------------------------------------------------------\n";
    for (auto &p : processes)
    {
        cout << p.id << "\t" << p.at << "\t" << p.bt << "\t"
             << p.st << "\t" << p.ct << "\t" << p.tat << "\t"
             << p.wt << "\t" << p.rt << "\n";
    }

    // Throughput Calculation
    float throughput = (float)n / totalTime;
    cout << "\nAverage TAT: " << totalTAT / n;
    cout << "\nAverage WT: " << totalWT / n;
    cout << "\nAverage RT: " << totalRT / n;
    cout << "\nThroughput: " << fixed << setprecision(2) << throughput << " processes/unit time";
    cout << "\nCPU Utilization: " << fixed << setprecision(2) << cpuUtilization << "%\n";
}

int main()
{
    int n, levels;
    cout << "Enter number of processes: ";
    cin >> n;
    vector<Process> processes(n);

    cout << "Enter Arrival Time and Burst Time for each process:\n";
    for (int i = 0; i < n; i++)
    {
        cout << "Process " << i + 1 << " (AT BT): ";
        cin >> processes[i].at >> processes[i].bt;
        processes[i].id = i + 1;
        processes[i].remaining_bt = processes[i].bt;
    }

    cout << "Enter number of priority levels (queues): ";
    cin >> levels;
    vector<int> timeQuantums(levels);

    cout << "Enter Time Quantum for each level:\n";
    for (int i = 0; i < levels; i++)
    {
        cout << "Queue " << i + 1 << ": ";
        cin >> timeQuantums[i];
    }

    mlfqScheduling(processes, timeQuantums);
    return 0;
}
