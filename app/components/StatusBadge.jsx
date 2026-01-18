import { getStatusClass } from '@/lib/statusStyles'

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs px-2 py-1 rounded border ${getStatusClass(status)}`}>
      {status}
    </span>
  )
}
