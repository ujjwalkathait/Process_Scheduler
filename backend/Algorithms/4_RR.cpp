#include <iostream>
#include <iomanip>
#include <queue>
#include <vector>
#include <algorithm> // Required for sort()

using namespace std;

struct Process
{
    int id, at, bt, rt, st, ct, tat, wt;
    bool started = false; // Tracks first execution for response time
};

void roundRobinScheduling(vector<Process> &processes, int tq)
{
    int n = processes.size(), completed = 0, currentTime = 0;
    float totalTAT = 0, totalWT = 0, totalRT = 0, totalIdleTime = 0;

    queue<int> readyQueue;
    vector<int> remainingBT(n);

    for (int i = 0; i < n; i++)
        remainingBT[i] = processes[i].bt;

    // Sorting by Arrival Time with tie-breaking by Process ID
    sort(processes.begin(), processes.end(), [](const Process &a, const Process &b)
         { return (a.at == b.at) ? (a.id < b.id) : (a.at < b.at); });

    int i = 0;
    cout << "\nGantt Chart:\n|";

    while (completed < n)
    {
        // Add newly arrived processes to the ready queue
        while (i < n && processes[i].at <= currentTime)
        {
            readyQueue.push(i);
            i++;
        }

        if (readyQueue.empty())
        { // CPU idle case
            currentTime++;
            totalIdleTime++;
        }
        else
        {
            int idx = readyQueue.front();
            readyQueue.pop();

            if (!processes[idx].started)
            {
                processes[idx].st = currentTime;
                processes[idx].started = true;
                totalRT += (processes[idx].st - processes[idx].at);
            }

            int executionTime = min(tq, remainingBT[idx]);
            remainingBT[idx] -= executionTime;
            currentTime += executionTime;
            cout << " P" << processes[idx].id << " |";

            // Add newly arrived processes during execution
            while (i < n && processes[i].at <= currentTime)
            {
                readyQueue.push(i);
                i++;
            }

            // If process still has burst time left, push it back
            if (remainingBT[idx] > 0)
            {
                readyQueue.push(idx);
            }
            else
            { // Process completed
                processes[idx].ct = currentTime;
                processes[idx].tat = processes[idx].ct - processes[idx].at;
                processes[idx].wt = processes[idx].tat - processes[idx].bt;
                totalTAT += processes[idx].tat;
                totalWT += processes[idx].wt;
                completed++;
            }
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
    cout << "\n\nRound Robin Scheduling Results:\n";
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
    int n, tq;
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

    cout << "Enter Time Quantum: ";
    cin >> tq;

    roundRobinScheduling(processes, tq);
    return 0;
}
