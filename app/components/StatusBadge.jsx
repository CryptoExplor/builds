export default function StatusBadge({ status }) {
  const styles = {
    production: 'bg-green-500/10 text-green-400 border-green-500/20',
    beta: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    alpha: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    paused: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  }

  return (
    <span className={`text-xs px-2 py-1 rounded border ${styles[status]}`}>
      {status}
    </span>
  )
}