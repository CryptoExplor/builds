import { Github, Twitter, Mail, Globe, MapPin } from 'lucide-react'
import { PROFILE } from '@/lib/profile'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0d1219]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <h2 className="text-lg font-bold mb-1">{PROFILE.name}</h2>
            <p className="text-sm text-white/55 mb-3">{PROFILE.tagline}</p>
            <p className="text-sm text-white/45 leading-relaxed max-w-sm">
              {PROFILE.positioning}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/40">
              <MapPin size={13} />
              {PROFILE.location} · shipping since{' '}
              {new Date(PROFILE.accountSince).getFullYear()}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-white/40 mb-4">
              Find me
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/65 hover:text-white transition"
                >
                  <Github size={15} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.farcaster}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/65 hover:text-white transition"
                >
                  <img src="/farcaster.png" alt="" className="w-4 h-4" />
                  Farcaster · {PROFILE.farcasterHandle}
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/65 hover:text-white transition"
                >
                  <Twitter size={15} />
                  X · {PROFILE.twitterHandle}
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/65 hover:text-white transition"
                >
                  <Globe size={15} />
                  Website
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 text-white/65 hover:text-white transition break-all"
                >
                  <Mail size={15} />
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Tip */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-white/40 mb-4">Tip</h3>
            <code className="block px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[11px] text-white/70 font-mono break-all">
              0x4f6Fb0A6c8A4C667bdF73C0257BE162B144c1624
            </code>
            <p className="mt-4 text-sm text-white/70">
              Made with 🔥 by <span className="font-semibold">{PROFILE.handle}</span>
            </p>
            <p className="text-xs text-white/40 mt-1">Trust through transparency</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/35">
          <p>© {new Date().getFullYear()} {PROFILE.handle}</p>
          <p>Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  )
}
