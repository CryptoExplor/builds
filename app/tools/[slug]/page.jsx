import { loadTools } from '@/lib/loadTools'
import { getStatusClass } from '@/lib/statusStyles'
import { ExternalLink, Github, Calendar, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Generate static paths at build time
export function generateStaticParams() {
  const tools = loadTools()
  return tools.map(tool => ({
    slug: tool.slug,
  }))
}

// Generate metadata for SEO and social sharing
export function generateMetadata({ params }) {
  const tools = loadTools()
  const tool = tools.find(t => t.slug === params.slug)
  
  if (!tool) {
    return {
      title: 'Project Not Found | Builds by CryptoExplor',
      description: 'The requested project could not be found.'
    }
  }

  return {
    title: `${tool.name} | Builds by CryptoExplor`,
    description: tool.description,
    keywords: tool.tags.join(', '),
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: tool.liveUrl,
      siteName: 'Builds by CryptoExplor',
      type: 'website',
      images: [
        {
          url: tool.ogImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: tool.name,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.name,
      description: tool.description,
      creator: '@CryptoExplor',
      images: [tool.ogImage || '/og-image.png'],
    },
    alternates: {
      canonical: `https://cryptoexplor.vercel.app/tools/${tool.slug}`
    }
  }
}

// Get related tools based on shared tags or categories
function getRelatedTools(currentTool, allTools) {
  return allTools
    .filter(t => t.slug !== currentTool.slug)
    .map(t => {
      // Calculate similarity score
      const sharedTags = t.tags.filter(tag => currentTool.tags.includes(tag)).length
      const sharedCategories = t.category.filter(cat => currentTool.category.includes(cat)).length
      return {
        ...t,
        score: (sharedTags * 2) + (sharedCategories * 3)
      }
    })
    .filter(t => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export default function ToolPage({ params }) {
  const tools = loadTools()
  const tool = tools.find(t => t.slug === params.slug)
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-[#0b0f14] text-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <p className="opacity-60 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="text-indigo-400 hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to all projects
          </Link>
        </div>
      </div>
    )
  }

  const relatedTools = getRelatedTools(tool, tools)

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Back Link */}
        <Link 
          href="/" 
          className="text-sm opacity-60 hover:opacity-100 transition mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to all projects
        </Link>

        {/* Main Card */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-8 mb-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs opacity-60 font-mono">
                  #{tool.serial.toString().padStart(3, '0')}
                </span>
                {tool.featured && (
                  <span className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold">{tool.name}</h1>
            </div>
            <span className={`text-xs px-2 py-1 rounded border ${getStatusClass(tool.status)}`}>
              {tool.status}
            </span>
          </div>

          {/* Description */}
          <p className="text-lg opacity-80 mb-8">{tool.description}</p>

          {/* Features Section */}
          {tool.features && tool.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>✨</span> Key Features
              </h2>
              <div className="grid gap-3">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-lg mt-0.5">{feature.split(' - ')[0]}</div>
                    <div className="flex-1">
                      <p className="text-sm opacity-90">
                        {feature.split(' - ').slice(1).join(' - ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>🎯</span> Use Cases
              </h2>
              <ul className="space-y-2">
                {tool.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm opacity-80">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {tool.techStack && tool.techStack.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>🛠️</span> Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 rounded-lg text-sm border border-indigo-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
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

          {/* Metadata Grid */}
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
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-60 mb-2">Status</div>
              <div className="text-sm font-medium capitalize">{tool.status}</div>
            </div>
          </div>

          {/* Web3 Metadata (if present) */}
          {tool.chains && tool.chains.length > 0 && (
            <div className="mb-8 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-lg">
              <div className="text-xs opacity-60 mb-2">Supported Chains</div>
              <div className="flex flex-wrap gap-2">
                {tool.chains.map(chain => (
                  <span key={chain} className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded capitalize">
                    {chain}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Primary actions row */}
            <div className="flex flex-col sm:flex-row gap-3">
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

            {/* Farcaster button (if present) */}
            {tool.farcaster && (
              <a
                href={tool.farcaster}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 rounded-lg transition font-medium"
              >
                <img 
                  src="/farcaster.png" 
                  alt="Farcaster" 
                  className="w-5 h-5"
                />
                View on Farcaster
              </a>
            )}
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Related Projects</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedTools.map(related => (
                <Link
                  key={related.slug}
                  href={`/tools/${related.slug}`}
                  className="block p-4 bg-[#111827] border border-white/10 rounded-lg hover:border-indigo-500 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs opacity-60 font-mono">
                      #{related.serial.toString().padStart(3, '0')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusClass(related.status)}`}>
                      {related.status}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{related.name}</h3>
                  <p className="text-sm opacity-70 line-clamp-2">{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
