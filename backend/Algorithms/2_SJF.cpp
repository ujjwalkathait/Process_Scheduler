#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>

using namespace std;

struct Process
{
    int id, at, bt, st, ct, tat, wt, rt;
    bool completed = false; // For tracking completed processes
};

void sjfScheduling(vector<Process> &processes)
{
    int n = processes.size(), completed = 0, currentTime = 0;
    float totalTAT = 0, totalWT = 0, totalRT = 0, totalIdleTime = 0;

    // Sorting by Arrival Time
    sort(processes.begin(), processes.end(), [](Process a, Process b)
         { return a.at < b.at; });

    cout << "\nGantt Chart:\n|";

    while (completed < n)
    {
        int idx = -1, minBT = 1e9; // Arbitrary large value for comparison

        // Find process with shortest burst time among arrived processes
        for (int i = 0; i < n; i++)
        {
            if (!processes[i].completed && processes[i].at <= currentTime && processes[i].bt < minBT)
            {
                minBT = processes[i].bt;
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
            processes[idx].st = currentTime;
            processes[idx].ct = processes[idx].st + processes[idx].bt;
            processes[idx].tat = processes[idx].ct - processes[idx].at;
            processes[idx].wt = processes[idx].tat - processes[idx].bt;
            processes[idx].rt = processes[idx].st - processes[idx].at;
            processes[idx].completed = true;
            completed++;
            currentTime = processes[idx].ct;

            totalTAT += processes[idx].tat;
            totalWT += processes[idx].wt;
            totalRT += processes[idx].rt;

            cout << " P" << processes[idx].id << " |";
        }
    }

    // CPU Utilization Calculation
    int totalTime = processes[n - 1].ct - processes[0].at; // Total time from first arrival to last completion
    float cpuUtilization = ((totalTime - totalIdleTime) / totalTime) * 100;

    // Output Table
    cout << "\n0 ";
    for (auto &p : processes)
        cout << setw(4) << p.ct << " ";

    cout << "\n\nSJF Scheduling Results:\n";
    cout << "-------------------------------------------------------------------\n";
    cout << "PID\tAT\tBT\tST\tCT\tTAT\tWT\tRT\n";
    cout << "-------------------------------------------------------------------\n";
    for (auto &p : processes)
    {
        cout << p.id << "\t" << p.at << "\t" << p.bt << "\t" << p.st << "\t"
             << p.ct << "\t" << p.tat << "\t" << p.wt << "\t" << p.rt << "\n";
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

    sjfScheduling(processes);
    return 0;
}
