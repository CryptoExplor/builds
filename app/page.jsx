import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Filter, Search, Code2, Zap } from 'lucide-react';
// Import the loadTools function
import { loadTools } from '../lib/loadTools';

// In the component, get tools from the loadTools function
export default function ToolHub({ tools }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);

  const allStatuses = ['all', ...new Set(tools.map(t => t.status))];

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = selectedStatus === 'all' || tool.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tools, searchQuery, selectedStatus]);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#111827]/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">CryptoExplor</h1>
              <p className="text-xs opacity-60">Tool Registry</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-60">{tools.length} Tools</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3">Developer Tools & Apps</h2>
          <p className="text-lg opacity-70">Open-source tools for blockchain, DeFi, and beyond</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
            <input
              type="text"
              placeholder="Search tools, tags, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter size={18} className="opacity-40" />
            {allStatuses.map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
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

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map(tool => (
              <ToolCard 
                key={tool.slug} 
                tool={tool}
                onClick={() => setSelectedTool(tool)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-60">
            <p>No tools found matching your filters</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/10 text-center opacity-60 text-sm">
          <p>Built with Next.js • Auto-deployed on Vercel</p>
          <p className="mt-2">Add tools by creating a file in <code className="px-2 py-1 bg-white/5 rounded">tools/*.js</code></p>
        </footer>
      </main>

      {/* Tool Detail Modal */}
      {selectedTool && (
        <ToolDetail tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </div>
  );
}

// Fetch tools data on the server side
export function getStaticProps() {
  const tools = loadTools();
  return {
    props: {
      tools,
    },
  };
}

const StatusBadge = ({ status }) => {
  const styles = {
    production: "bg-green-500/10 text-green-500 border-green-500/20",
    beta: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    alpha: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    paused: "bg-gray-500/10 text-gray-500 border-gray-500/20"
  };

  return (
    <span className={`text-xs px-2 py-1 rounded border ${styles[status]}`}>
      {status}
    </span>
  );
};

const ToolCard = ({ tool, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="rounded-xl border border-white/10 bg-[#111827] p-5 hover:border-indigo-500 transition cursor-pointer group"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs opacity-60 font-mono">#{tool.serial.toString().padStart(3, '0')}</span>
        <StatusBadge status={tool.status} />
      </div>

      <h3 className="text-lg font-semibold group-hover:text-indigo-400 transition">{tool.name}</h3>
      <p className="text-sm opacity-70 mt-2 line-clamp-2">{tool.description}</p>

      <div className="flex gap-2 mt-4 flex-wrap">
        {tool.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1 text-xs opacity-60">
          <Code2 size={14} />
          {tool.category[0]}
        </div>
        <div className="flex items-center gap-1 text-xs opacity-60">
          <Zap size={14} />
          {new Date(tool.launched).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

const ToolDetail = ({ tool, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-[#111827] border border-white/10 rounded-2xl max-w-2xl w-full p-8" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-xs opacity-60 font-mono mb-2">#{tool.serial.toString().padStart(3, '0')}</div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
          </div>
          <StatusBadge status={tool.status} />
        </div>

        <p className="text-lg opacity-80 mb-6">{tool.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map(tag => (
            <span key={tag} className="text-sm px-3 py-1 bg-white/5 rounded-lg border border-white/5">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/5 rounded-lg">
          <div>
            <div className="text-xs opacity-60 mb-1">Category</div>
            <div className="text-sm">{tool.category.join(', ')}</div>
          </div>
          <div>
            <div className="text-xs opacity-60 mb-1">Launched</div>
            <div className="text-sm">{new Date(tool.launched).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="flex gap-4">
          <a 
            href={tool.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-medium"
          >
            <ExternalLink size={18} />
            Live App
          </a>
          <a 
            href={tool.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition font-medium"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>

        <button 
          onClick={onClose}
          className="mt-6 w-full py-2 text-sm opacity-60 hover:opacity-100 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};