#include <iostream>
#include <vector>
#include <iomanip>
#include <algorithm>

using namespace std;

struct Process
{
    int id, at, bt, priority, remaining_bt, st, ct, tat, wt, rt;
    bool started = false;
};

void priorityPreemptive(vector<Process> &processes)
{
    int n = processes.size(), completed = 0, currentTime = 0;
    float totalTAT = 0, totalWT = 0, totalRT = 0, totalIdleTime = 0;
    int lastCompletionTime = 0;

    // Sorting by Arrival Time initially
    sort(processes.begin(), processes.end(), [](const Process &a, const Process &b)
         { return a.at < b.at; });

    cout << "\nGantt Chart:\n|";

    while (completed < n)
    {
        int idx = -1, highestPriority = 1e9;

        // Find process with highest priority (lowest number)
        for (int i = 0; i < n; i++)
        {
            if (processes[i].remaining_bt > 0 && processes[i].at <= currentTime)
            {
                if (processes[i].priority < highestPriority)
                {
                    highestPriority = processes[i].priority;
                    idx = i;
                }
                else if (processes[i].priority == highestPriority)
                {
                    if (processes[i].at < processes[idx].at) // Tie-break by AT
                        idx = i;
                }
            }
        }

        if (idx == -1)
        { // No ready process, CPU is idle
            currentTime++;
            totalIdleTime++;
        }
        else
        {
            if (!processes[idx].started)
            {
                processes[idx].st = currentTime;
                processes[idx].rt = processes[idx].st - processes[idx].at;
                processes[idx].started = true;
            }

            cout << " P" << processes[idx].id << " |";
            processes[idx].remaining_bt--;
            currentTime++;

            if (processes[idx].remaining_bt == 0)
            { // Process completes
                processes[idx].ct = currentTime;
                processes[idx].tat = processes[idx].ct - processes[idx].at;
                processes[idx].wt = processes[idx].tat - processes[idx].bt;
                totalTAT += processes[idx].tat;
                totalWT += processes[idx].wt;
                totalRT += processes[idx].rt;
                completed++;
                lastCompletionTime = processes[idx].ct;
            }
        }
    }

    // CPU Utilization Calculation
    int totalTime = lastCompletionTime - processes[0].at;
    float cpuUtilization = ((totalTime - totalIdleTime) / totalTime) * 100;

    // Gantt Chart Completion
    cout << "\n0 ";
    for (auto &p : processes)
        cout << setw(4) << p.ct << " ";

    // Output Table
    cout << "\n\nPriority (Preemptive) Scheduling Results:\n";
    cout << "-------------------------------------------------------------\n";
    cout << "PID\tAT\tBT\tPriority\tST\tCT\tTAT\tWT\tRT\n";
    cout << "-------------------------------------------------------------\n";
    for (auto &p : processes)
    {
        cout << p.id << "\t" << p.at << "\t" << p.bt << "\t" << p.priority << "\t\t"
             << p.st << "\t" << p.ct << "\t" << p.tat << "\t" << p.wt << "\t" << p.rt << "\n";
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

    cout << "Enter Arrival Time, Burst Time & Priority for each process:\n";
    for (int i = 0; i < n; i++)
    {
        cout << "Process " << i + 1 << " (AT BT Priority): ";
        cin >> processes[i].at >> processes[i].bt >> processes[i].priority;
        processes[i].id = i + 1;
        processes[i].remaining_bt = processes[i].bt;
    }

    priorityPreemptive(processes);
    return 0;
}
