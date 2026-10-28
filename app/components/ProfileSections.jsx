import { Compass, External, Layers, Rocket, Target } from '@/app/components/icons'
import { PROFILE } from '@/lib/profile'
import Reveal from './Reveal'

const FOCUS_ICONS = [Rocket, Target, Layers, Compass]

/**
 * ProfileSections — the "what I build" / focus areas / Farcaster mini apps blocks,
 * sourced from the CryptoExplor GitHub profile README via lib/profile.js.
 * Server component; motion comes from the Reveal client wrapper.
 */
export default function ProfileSections() {
  return (
    <>
      {/* Focus areas */}
      <Reveal className="mb-14" y={24}>
        <h2 className="text-2xl font-bold mb-1">What I build</h2>
        <p className="text-sm text-white/50 mb-6">{PROFILE.approach}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILE.focusAreas.map((area, i) => {
            const Icon = FOCUS_ICONS[i % FOCUS_ICONS.length]
            return (
              <div
                key={area.title}
                className="rounded-xl border border-white/10 bg-[#111827] p-5 hover:border-indigo-500/60 transition"
              >
                <Icon size={18} className="text-indigo-400 mb-3" />
                <h3 className="font-semibold text-sm mb-1">{area.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{area.detail}</p>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* Farcaster mini apps */}
      <Reveal className="mb-14" y={24}>
        <div className="flex items-baseline justify-between mb-1 flex-wrap gap-2">
          <h2 className="text-2xl font-bold">Farcaster Mini Apps</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">
            {PROFILE.miniApps.length} live
          </span>
        </div>
        <p className="text-sm text-white/50 mb-6">
          All built and maintained by {PROFILE.name}.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILE.miniApps.map(app => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-[#111827] p-4 hover:border-purple-500/60 transition"
            >
              <div>
                <div className="font-semibold text-sm group-hover:text-purple-300 transition">
                  {app.name}
                </div>
                <p className="text-xs text-white/55 mt-1 leading-relaxed">{app.detail}</p>
              </div>
              <External
                size={15}
                className="mt-0.5 shrink-0 opacity-35 group-hover:opacity-90 transition"
              />
            </a>
          ))}
        </div>
      </Reveal>

      {/* GitHub accounts */}
      <Reveal className="mb-14" y={24}>
        <h2 className="text-2xl font-bold mb-1">Where the code lives</h2>
        <p className="text-sm text-white/50 mb-6">
          This registry pulls from two GitHub accounts.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROFILE.accounts.map(account => (
            <a
              key={account.login}
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-[#111827] p-5 hover:border-indigo-500/60 transition"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold group-hover:text-indigo-300 transition">
                    {account.login}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-white/50">
                    {account.kind}
                  </span>
                </div>
                <p className="text-xs text-white/55 mt-2 leading-relaxed">{account.note}</p>
              </div>
              <External
                size={15}
                className="mt-0.5 shrink-0 opacity-35 group-hover:opacity-90 transition"
              />
            </a>
          ))}
        </div>
      </Reveal>

      {/* Signals */}
      <Reveal className="mb-4" y={24}>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/[0.08] to-cyan-500/[0.04] p-6">
          <h2 className="text-lg font-bold mb-4">Signals</h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {PROFILE.signals.map(signal => (
              <li key={signal} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  )
}
