export default function CPUStatus({ status, algorithm }) {
  return (
    <div className="flex items-center space-x-4">
      <span>CPU: <strong>{status}</strong></span>
      <span>Algorithm: <strong>{algorithm}</strong></span>
    </div>
  );
}