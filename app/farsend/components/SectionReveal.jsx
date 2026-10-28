'use client'

/**
 * SectionReveal — one-time entrance for a block of content.
 *
 * Rise 32px, fade from 0 to 1, 700ms on the base curve. Triggered with a single
 * IntersectionObserver per section, so nothing runs on scroll frames.
 *
 * The hidden state is only applied after mount. Server HTML and no-JS readers
 * therefore get the content fully visible instead of a blank section.
 */
import { useEffect, useRef, useState } from 'react'

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(true)
      setMounted(true)
      return
    }

    // Anything already on screen at mount is simply shown. Hiding it first and
    // revealing it again is what produces a visible flicker on first paint.
    const { top } = el.getBoundingClientRect()
    const startsBelowFold = top > window.innerHeight * 0.9

    if (!startsBelowFold || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }

    setMounted(true)

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hidden = mounted && !shown

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={[
        'transition-[opacity,transform] duration-700 ease-settle',
        hidden ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}
