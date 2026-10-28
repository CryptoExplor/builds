'use client'

/**
 * TaglineReveal — the page's one large statement.
 *
 * Each word starts at 30% opacity and rises to full opacity as it crosses a
 * trigger line near the middle of the viewport, so the sentence fills in behind
 * the reader instead of flipping all at once. One IntersectionObserver watches
 * every word; nothing is attached to the scroll event.
 */
import { useEffect, useRef, useState } from 'react'

export default function TaglineReveal({ lines }) {
  const root = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [lit, setLit] = useState({})

  useEffect(() => {
    const el = root.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      setLit({}) // everything stays at full opacity, see the `mounted` guard
      return
    }

    setMounted(true)

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const key = entry.target.dataset.word
          setLit(prev => (prev[key] ? prev : { ...prev, [key]: true }))
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    )

    el.querySelectorAll('[data-word]').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <p
      ref={root}
      className="max-w-[680px] text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
    >
      {lines.map((line, lineIndex) =>
        line.split(' ').map((word, wordIndex) => {
          const key = `${lineIndex}-${wordIndex}`
          return (
            <span
              key={key}
              data-word={key}
              className={[
                'inline-block transition-opacity duration-500 ease-settle',
                mounted && !lit[key] ? 'opacity-30' : 'opacity-100',
              ].join(' ')}
            >
              {word}
              <span aria-hidden="true">&nbsp;</span>
            </span>
          )
        })
      )}
    </p>
  )
}
