import { loadTools } from '@/lib/loadTools'
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react'

// Generate static paths at build time
export function generateStaticParams() {
  const tools = loadTools()
  return tools.map(tool => ({
    slug: tool.slug,
  }))
}

// Generate metadata for SEO
export function generateMetadata({ params }) {
  const tools = loadTools()
  const tool = tools.find(t => t.slug === params.slug)
  
  if (!tool) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${tool.name} | Builds by CryptoExplor`,
    description: tool.description,
  }
}

export default function ToolPage({ params }) {
  const tools = loadTools()
  const tool = tools.find(t => t.slug === params.slug)
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-[#0b0f14] text-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <a href="/" className="text-indigo-400 hover:underline">
            ← Back to all projects
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <main className="max-w-4xl mx-auto px-6 py-10">
        <a href="/" className="text-sm opacity-60 hover:opacity-100 transition mb-6 inline-block">
          ← Back to all projects
        </a>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-xs opacity-60 font-mono mb-2">
                #{tool.serial.toString().padStart(3, '0')}
              </div>
              <h1 className="text-4xl font-bold">{tool.name}</h1>
            </div>
            <span className={`text-xs px-2 py-1 rounded border ${
              tool.status === 'production' ? "bg-green-500/10 text-green-500 border-green-500/20" :
              tool.status === 'beta' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
              tool.status === 'alpha' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
              "bg-gray-500/10 text-gray-500 border-gray-500/20"
            }`}>
              {tool.status}
            </span>
          </div>

          <p className="text-lg opacity-80 mb-8">{tool.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tool.tags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 text-sm px-3 py-1 bg-white/5 rounded-lg border border-white/5"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-white/5 rounded-lg">
            <div>
              <div className="text-xs opacity-60 mb-2 flex items-center gap-1">
                <Tag size={14} />
                Category
              </div>
              <div className="text-sm font-medium">{tool.category.join(', ')}</div>
            </div>
            <div>
              <div className="text-xs opacity-60 mb-2 flex items-center gap-1">
                <Calendar size={14} />
                Launched
              </div>
              <div className="text-sm font-medium">
                {new Date(tool.launched).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-60 mb-2">Status</div>
              <div className="text-sm font-medium capitalize">{tool.status}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={tool.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-medium"
            >
              <ExternalLink size={18} />
              Open Live App
            </a>
            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition font-medium"
            >
              <Github size={18} />
              View on GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}