import { loadTools } from '@/lib/loadTools'
import Navbar from './components/Navbar'
import ToolGrid from './components/ToolGrid'
import Footer from './components/Footer'

export default function HomePage() {
  // Server-side data loading at build time
  const tools = loadTools()

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar toolCount={tools.length} />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">Builds</h1>
          <p className="text-xl opacity-70 mb-2">
            Everything I ship — tools, apps, experiments
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm opacity-60">
            <span>{tools.length} projects</span>
            <span>•</span>
            <span>Auto-synced from Git</span>
          </div>
        </div>

        <ToolGrid tools={tools} />
      </main>

      <Footer />
    </div>
  )
}
