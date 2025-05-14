
export function StatsPanel({ stats }) {
  return (
    <div className="border-2 border-green-500 p-2 rounded-lg grid gap-1">
      <div>Average Waiting Time: <span className="text-green-400">{stats.wait.toFixed(2)}</span></div>
      <div>Average Turnaround Time: <span className="text-green-400">{stats.turn.toFixed(2)}</span></div>
      <div>Total Execution Time: <span className="text-green-400">{stats.total}</span></div>
    </div>
  );
}