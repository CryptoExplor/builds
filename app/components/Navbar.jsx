import { Boxes, Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import { PROFILE } from '@/lib/profile'

export default function Navbar({ toolCount }) {
  return (
    <header className="border-b border-white/10 bg-[#0b0f14]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center shrink-0">
            <Boxes size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">Builds</h1>
            <p className="text-xs opacity-60 leading-tight">
              by {PROFILE.name} · {PROFILE.handle}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-5">
          {toolCount ? (
            <span className="text-sm opacity-60 hidden sm:inline">{toolCount} projects</span>
          ) : null}

          {/* Entry point to the FarSend landing page in app/farsend. */}
          <Link
            href="/farsend"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/25 transition"
          >
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            FarSend
          </Link>

          <a
            href={PROFILE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${PROFILE.handle} on X`}
            className="opacity-60 hover:opacity-100 transition"
          >
            <Twitter size={18} />
          </a>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${PROFILE.handle} on GitHub`}
            className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub →</span>
          </a>
        </div>
      </div>
    </header>
  )
}
