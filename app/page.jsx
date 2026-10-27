import { loadTools } from '@/lib/loadTools'
import { PROFILE } from '@/lib/profile'
import Navbar from './components/Navbar'
import ProfileHero from './components/ProfileHero'
import ProfileSections from './components/ProfileSections'
import ToolGrid from './components/ToolGrid'
import Footer from './components/Footer'
import Reveal from './components/Reveal'

export default function HomePage() {
  // Server-side data loading at build time
  const tools = loadTools()

  const stats = {
    projects: tools.length,
    production: tools.filter(t => t.status === 'production').length,
    miniApps: PROFILE.miniApps.length,
  }

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar toolCount={tools.length} />

      <ProfileHero
        toolCount={stats.projects}
        miniAppCount={stats.miniApps}
        chainCount={PROFILE.chains.length}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <ProfileSections />

        {/* Registry */}
        <Reveal className="mb-8" y={20}>
          <div className="flex items-end justify-between flex-wrap gap-4 border-t border-white/10 pt-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">The registry</h2>
              <p className="text-white/60">
                Everything I ship — tools, apps, experiments. Auto-synced from Git.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span>
                <span className="text-white font-semibold">{stats.projects}</span> projects
              </span>
              <span aria-hidden>•</span>
              <span>
                <span className="text-white font-semibold">{stats.production}</span> in production
              </span>
            </div>
          </div>
        </Reveal>

        <ToolGrid tools={tools} />
      </main>

      <Footer />
    </div>
  )
}
