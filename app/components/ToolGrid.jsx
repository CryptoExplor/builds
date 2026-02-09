'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, Filter } from 'lucide-react'
import ToolCard from './ToolCard'

export default function ToolGrid({ tools }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const searchInputRef = useRef(null)

  const allStatuses = ['all', ...new Set(tools.map(t => t.status))]
  const hasActiveFilters = searchQuery.trim().length > 0 || selectedStatus !== 'all'
  const resetFilters = () => {
    setSearchQuery('')
    setSelectedStatus('all')
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      const target = event.target
      const isTypingField =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)

      if (!isTypingField) {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input
            type="text"
            placeholder="Search projects, tags, or descriptions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            ref={searchInputRef}
            aria-label="Search projects"
            className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
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
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="px-3 py-2 rounded-lg text-xs border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredTools.length > 0 ? (
        <>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
            Showing {filteredTools.length} of {tools.length} projects
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map(tool => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
          <p className="text-lg font-semibold">No projects found</p>
          <p className="mt-2 text-sm text-white/50">Try adjusting your search or status filter.</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </>
  )
}
