'use client'

/**
 * SiteNav — floating pill that sits off the top edge rather than flush against it.
 *
 * The menu toggle morphs between its two states with the base curve, the mobile
 * panel is full height with a heavy blur, and the links arrive in reading order
 * 60ms apart, capped so a long menu never drags.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Close, Github, Menu } from '@/app/components/icons'
const LINKS = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#security', label: 'Security' },
  { href: '#faq', label: 'FAQ' },
]

export default function SiteNav({ current = 'product' }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return

    firstLinkRef.current?.focus()

    const onKeyDown = event => {
      if (event.key === 'Escape') close()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // The panel is mobile only. If the viewport grows past the breakpoint while
    // it is open, the panel is hidden by CSS but the scroll lock would stay on,
    // leaving the desktop page unable to scroll.
    const desktop = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = event => {
      if (event.matches) setOpen(false)
    }
    desktop.addEventListener('change', onBreakpoint)

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open, close])

  return (
    <>
      {/* Skip link: first tab stop on the page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-surface-1"
      >
        Skip to content
      </a>

      <header className="fixed left-1/2 top-3 z-50 w-[calc(100%-24px)] max-w-3xl -translate-x-1/2">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between gap-3 rounded-full bg-surface-2/80 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <Link
            href="/farsend"
            className="flex items-center gap-2 rounded-full px-2 py-1 transition-opacity duration-300 ease-settle hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-current={current === 'product' ? 'page' : undefined}
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-xs font-bold text-surface-1"
            >
              F
            </span>
            <span className="text-sm font-semibold text-white">FarSend</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors duration-300 ease-settle hover:bg-surface-3 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href="https://github.com/CryptoExplor/farsend"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FarSend source on GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors duration-300 ease-settle hover:bg-surface-3 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex"
            >
              <Github size={18} />
            </a>

            <a
              href="https://farsend.vercel.app"
              className="hidden rounded-full bg-accent px-3 py-2 text-sm font-semibold text-surface-1 transition-colors duration-300 ease-settle hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:block"
            >
              Open app
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors duration-300 ease-settle hover:bg-surface-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
            >
              {/* Both glyphs sit in the same box and cross fade, so the control
                  transforms between states instead of swapping instantly. */}
              <span className="relative block h-4 w-4">
                <Menu
                  size={16}
                  aria-hidden="true"
                  className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-settle ${
                    open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                />
                <Close
                  size={16}
                  aria-hidden="true"
                  className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-settle ${
                    open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full height mobile panel */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-surface-1/95 backdrop-blur-2xl transition-[opacity,visibility] duration-500 ease-settle md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-center px-6 pb-16">
          <ul className="space-y-2">
            {LINKS.map((link, index) => (
              <li
                key={link.href}
                style={{
                  transitionDelay: open ? `${index * 60}ms` : '0ms',
                }}
                className={`transition-[opacity,transform] duration-500 ease-settle ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={close}
                  className="block py-3 text-3xl font-semibold text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li
              style={{ transitionDelay: open ? '180ms' : '0ms' }}
              className={`pt-4 transition-[opacity,transform] duration-500 ease-settle ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <a
                href="https://farsend.vercel.app"
                onClick={close}
                className="inline-block rounded-full bg-accent px-6 py-2 text-base font-semibold text-surface-1"
              >
                Open batch sender
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
