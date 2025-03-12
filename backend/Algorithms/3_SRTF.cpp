#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

struct Process
{
    int id, at, bt, rt, st, ct, tat, wt;
    bool started = false; // To track first response time
};

void srtfScheduling(vector<Process> &processes)
{
    int n = processes.size(), completed = 0, currentTime = 0, prev = -1;
    float totalTAT = 0, totalWT = 0, totalRT = 0, totalIdleTime = 0;

    // Remaining Time Array
    vector<int> remainingBT(n);
    for (int i = 0; i < n; i++)
        remainingBT[i] = processes[i].bt;

    // Sorting by Arrival Time
    sort(processes.begin(), processes.end(), [](Process a, Process b)
         { return a.at < b.at; });

    cout << "\nGantt Chart:\n|";

    while (completed < n)
    {
        int idx = -1, minRT = INT_MAX;

        // Find process with shortest remaining time among arrived processes
        for (int i = 0; i < n; i++)
        {
            if (processes[i].at <= currentTime && remainingBT[i] > 0 && remainingBT[i] < minRT)
            {
                minRT = remainingBT[i];
                idx = i;
            }
        }

        if (idx == -1)
        { // No process available, CPU idle
            currentTime++;
            totalIdleTime++;
        }
        else
        {
            if (!processes[idx].started)
            {
                processes[idx].st = currentTime;
                processes[idx].started = true;
                totalRT += (processes[idx].st - processes[idx].at);
            }

            if (prev != idx)
                cout << " P" << processes[idx].id << " |"; // Gantt Chart Update

            remainingBT[idx]--; // Process Execution
            currentTime++;

            if (remainingBT[idx] == 0)
            { // Process completes execution
                processes[idx].ct = currentTime;
                processes[idx].tat = processes[idx].ct - processes[idx].at;
                processes[idx].wt = processes[idx].tat - processes[idx].bt;
                totalTAT += processes[idx].tat;
                totalWT += processes[idx].wt;
                completed++;
            }

            prev = idx;
        }
    }

    // CPU Utilization Calculation
    int totalTime = processes[n - 1].ct - processes[0].at;
    float cpuUtilization = ((totalTime - totalIdleTime) / totalTime) * 100;

    // Gantt Chart Completion
    cout << "\n0 ";
    for (auto &p : processes)
        cout << setw(4) << p.ct << " ";

    // Output Table
    cout << "\n\nSRTF Scheduling Results:\n";
    cout << "-------------------------------------------------------------------\n";
    cout << "PID\tAT\tBT\tST\tCT\tTAT\tWT\tRT\n";
    cout << "-------------------------------------------------------------------\n";
    for (auto &p : processes)
    {
        cout << p.id << "\t" << p.at << "\t" << p.bt << "\t" << p.st << "\t"
             << p.ct << "\t" << p.tat << "\t" << p.wt << "\t" << (p.st - p.at) << "\n";
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
    int n;
    cout << "Enter number of processes: ";
    cin >> n;
    vector<Process> processes(n);

    cout << "Enter Arrival Time & Burst Time for each process:\n";
    for (int i = 0; i < n; i++)
    {
        cout << "Process " << i + 1 << " (AT BT): ";
        cin >> processes[i].at >> processes[i].bt;
        processes[i].id = i + 1;
    }

    srtfScheduling(processes);
    return 0;
}
