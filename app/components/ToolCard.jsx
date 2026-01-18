import Link from 'next/link'
import { Code2, Zap, Star } from 'lucide-react'
import StatusBadge from './StatusBadge'

export default function ToolCard({ tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="block rounded-xl border border-white/10 bg-[#111827] p-5 hover:border-indigo-500 transition cursor-pointer group relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-60 font-mono">#{tool.serial.toString().padStart(3, '0')}</span>
          {/* Featured Badge - Inline with serial */}
          {tool.featured && (
            <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full px-2 py-0.5 text-xs font-semibold flex items-center gap-1">
              <Star size={10} className="fill-current" />
              Featured
            </span>
          )}
        </div>
        <StatusBadge status={tool.status} />
      </div>

      <h3 className="text-lg font-semibold group-hover:text-indigo-400 transition">{tool.name}</h3>
      <p className="text-sm opacity-70 mt-2 line-clamp-2">{tool.description}</p>

      {/* Feature Highlight */}
      {tool.features && tool.features.length > 0 && (
        <div className="mt-3 text-xs opacity-60">
          💡 {tool.features.length} features including {tool.features[0].split(' - ')[0]}
        </div>
      )}

      <div className="flex gap-2 mt-4 flex-wrap">
        {tool.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5">
            {tag}
          </span>
        ))}
        {tool.tags.length > 3 && (
          <span className="text-xs px-2 py-1 opacity-50">
            +{tool.tags.length - 3} more
          </span>
        )}
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1 text-xs opacity-60">
          <Code2 size={14} />
          {tool.category[0]}
        </div>
        <div className="flex items-center gap-1 text-xs opacity-60">
          <Zap size={14} />
          {new Date(tool.launched).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </div>
    </Link>
  )
}
