'use client'

/**
 * Reveal — GSAP ScrollTrigger wrapper for scroll-in reveals.
 *
 * Renders children untouched server-side; animation is attached in an effect so
 * SSR output never depends on motion. Honours prefers-reduced-motion by skipping
 * the tween entirely (content stays visible), and cleans the trigger up on unmount
 * so React StrictMode's double-invoke does not stack tweens.
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  duration = 0.7,
  start = 'top 88%',
  stagger = 0,
  once = true,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = stagger > 0 ? el.children : el

      gsap.set(targets, { opacity: 0, y, x, scale })

      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          once,
        },
      })

      // Cleanup for this matchMedia branch
      return () => tween.scrollTrigger?.kill()
    })

    return () => mm.revert()
  }, [delay, y, x, scale, duration, start, stagger, once])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
