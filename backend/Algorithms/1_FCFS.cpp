#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>

using namespace std;

struct Process
{
    int id, at, bt, st, ct, tat, wt, rt;
};

void fcfsScheduling(vector<Process> &processes)
{
    int n = processes.size();
    float totalTAT = 0, totalWT = 0, totalRT = 0, totalIdleTime = 0;

    // Sorting by Arrival Time
    sort(processes.begin(), processes.end(), [](Process a, Process b)
         { return a.at < b.at; });

    // FCFS Calculation
    for (int i = 0; i < n; i++)
    {
        processes[i].st = (i == 0) ? processes[i].at : max(processes[i].at, processes[i - 1].ct);
        processes[i].ct = processes[i].st + processes[i].bt;
        processes[i].tat = processes[i].ct - processes[i].at;
        processes[i].wt = processes[i].tat - processes[i].bt;
        processes[i].rt = processes[i].st - processes[i].at;

        // Calculate total idle time (when CPU is not processing)
        if (i > 0)
            totalIdleTime += (processes[i].st - processes[i - 1].ct);

        totalTAT += processes[i].tat;
        totalWT += processes[i].wt;
        totalRT += processes[i].rt;
    }

    // CPU Utilization Calculation
    int totalTime = processes[n - 1].ct - processes[0].at; // Total time from first arrival to last completion
    float cpuUtilization = ((totalTime - totalIdleTime) / totalTime) * 100;

    // Output Table
    cout << "\nFCFS Scheduling Results:\n";
    cout << "-------------------------------------------------------------------\n";
    cout << "PID\tAT\tBT\tST\tCT\tTAT\tWT\tRT\n";
    cout << "-------------------------------------------------------------------\n";
    for (auto &p : processes)
    {
        cout << p.id << "\t" << p.at << "\t" << p.bt << "\t" << p.st << "\t"
             << p.ct << "\t" << p.tat << "\t" << p.wt << "\t" << p.rt << "\n";
    }

    // Gantt Chart
    cout << "\nGantt Chart:\n|";
    for (auto &p : processes)
        cout << " P" << p.id << " |";
    cout << "\n0 ";
    for (auto &p : processes)
        cout << setw(4) << p.ct << " ";

    // Throughput Calculation
    float throughput = (float)n / totalTime;
    cout << "\n\nAverage TAT: " << totalTAT / n;
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

    fcfsScheduling(processes);
    return 0;
}
