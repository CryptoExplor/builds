'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import ToolCard from './ToolCard'

export default function ToolGrid({ tools }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const allStatuses = ['all', ...new Set(tools.map(t => t.status))]

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = selectedStatus === 'all' || tool.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [tools, searchQuery, selectedStatus])

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input
            type="text"
            placeholder="Search projects, tags, or descriptions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Filter size={18} className="opacity-40" />
          {allStatuses.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm transition capitalize ${
                selectedStatus === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[#111827] border border-white/10 hover:border-white/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 opacity-60">
          <p>No projects found matching your filters</p>
        </div>
      )}
    </>
  )
}