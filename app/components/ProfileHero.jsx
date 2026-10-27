'use client'

/**
 * ProfileHero — animated hero built from lib/profile.js + registry counts.
 *
 * Motion: headline mask reveal, staggered word entrance, animated stat counters,
 * and a slow gradient sweep. All of it is inside a gsap.matchMedia() branch so
 * prefers-reduced-motion users get the fully-rendered, static hero instead.
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MapPin, Globe, CalendarDays, Github, Twitter } from 'lucide-react'
import { PROFILE } from '@/lib/profile'

export default function ProfileHero({ toolCount, miniAppCount, chainCount }) {
  const root = useRef(null)
  const headlineRef = useRef(null)
  const taglineRef = useRef(null)
  const chipsRef = useRef(null)
  const statsRef = useRef(null)
  const metaRef = useRef(null)

  const stats = [
    { value: toolCount, suffix: '', label: 'projects shipped' },
    { value: miniAppCount, suffix: '', label: 'Farcaster mini apps' },
    { value: chainCount, suffix: '', label: 'ecosystems' },
    { value: PROFILE.publicRepos, suffix: '', label: 'public repos' },
  ]

  useEffect(() => {
    const el = root.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Headline: clip-mask slide up per word
        gsap.set(headlineRef.current?.children || [], { yPercent: 110, opacity: 0 })
        gsap.set(taglineRef.current, { opacity: 0, y: 16 })
        gsap.set(chipsRef.current?.children || [], { opacity: 0, y: 12, scale: 0.94 })
        gsap.set(statsRef.current?.children || [], { opacity: 0, y: 22 })
        gsap.set(metaRef.current?.children || [], { opacity: 0, x: -10 })

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.to(headlineRef.current?.children || [], {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.09,
        })
          .to(
            taglineRef.current,
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.45'
          )
          .to(
            chipsRef.current?.children || [],
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06 },
            '-=0.35'
          )
          .to(
            statsRef.current?.children || [],
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
            '-=0.3'
          )
          .to(
            metaRef.current?.children || [],
            { opacity: 1, x: 0, duration: 0.45, stagger: 0.07 },
            '-=0.3'
          )

        // Count-up on the stat numbers. The real value is in the markup already
        // (so no-JS and crawlers see it); drop it to 0 here and animate back up.
        // Safe from a visible flash because the stat cards are still opacity:0
        // from the gsap.set() above at this point in the same effect tick.
        const counters = el.querySelectorAll('[data-counter]')
        counters.forEach(node => {
          const target = Number(node.dataset.counter) || 0
          const obj = { v: 0 }
          node.textContent = '0'
          gsap.to(obj, {
            v: target,
            duration: 1.4,
            delay: 0.5,
            ease: 'power2.out',
            snap: { v: 1 },
            onUpdate: () => {
              node.textContent = Math.round(obj.v)
            },
          })
        })

        // Slow ambient drift on the background gradient
        gsap.to(el.querySelector('[data-aurora]'), {
          backgroundPosition: '200% 50%',
          duration: 18,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
      }, el)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  const headlineWords = ['Automation-first', 'Web3', 'infrastructure.']

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-b border-white/10"
    >
      {/* Ambient background */}
      <div
        data-aurora
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          background:
            'radial-gradient(60% 50% at 15% 20%, #4f46e5 0%, transparent 60%), radial-gradient(50% 45% at 85% 15%, #06b6d4 0%, transparent 62%), radial-gradient(55% 45% at 50% 95%, #7c3aed 0%, transparent 60%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-14">
        {/* Identity row */}
        <div ref={metaRef} className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-sm text-white/55">
          <span className="inline-flex items-center gap-2">
            <Github size={15} />
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              {PROFILE.handle}
            </a>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {PROFILE.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} />
            Shipping since {new Date(PROFILE.accountSince).getFullYear()}
          </span>
          <a
            href={PROFILE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition"
          >
            <Twitter size={14} />
            {PROFILE.twitterHandle}
          </a>
          <a
            href={PROFILE.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition"
          >
            <Globe size={14} />
            cryptoexplor.vercel.app
          </a>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
        >
          {headlineWords.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden align-bottom pr-3">
              <span
                className={`inline-block ${
                  i === 0
                    ? 'bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent'
                    : ''
                }`}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p ref={taglineRef} className="text-lg sm:text-xl text-white/70 max-w-2xl mb-6">
          {PROFILE.positioning} {PROFILE.philosophy}
        </p>

        {/* Ecosystem chips */}
        <div ref={chipsRef} className="flex flex-wrap gap-2 mb-12">
          {PROFILE.chains.map(chain => (
            <span
              key={chain}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/10 bg-white/[0.04] text-white/75"
            >
              {chain}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
            >
              <div className="text-3xl font-bold tabular-nums">
                <span data-counter={stat.value}>{stat.value}</span>
                {stat.suffix}
              </div>
              <div className="text-xs text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
