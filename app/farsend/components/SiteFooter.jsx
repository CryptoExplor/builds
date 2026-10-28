import Link from 'next/link'
import { GithubLogo, Globe, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'

import { PROFILE } from '@/lib/profile'

export default function SiteFooter() {
  return (
    <footer className="bg-surface-1">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-sm">
            <p className="text-lg font-semibold">FarSend</p>
            <p className="mt-2 text-base leading-relaxed text-white/60">
              Batch ETH and ERC20 payouts in one transaction. Built by{' '}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors duration-300 ease-settle hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {PROFILE.handle}
              </a>
              .
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
            <div className="space-y-2">
              <p className="text-white/55">Product</p>
              <Link
                href="/farsend"
                className="block text-white/70 transition-colors duration-300 ease-settle hover:text-white"
              >
                Overview
              </Link>
              <a
                href="https://farsend.vercel.app"
                className="block text-white/70 transition-colors duration-300 ease-settle hover:text-white"
              >
                Open the app
              </a>
              <a
                href="https://github.com/CryptoExplor/farsend"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/70 transition-colors duration-300 ease-settle hover:text-white"
              >
                Source
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-white/55">Elsewhere</p>
              <Link
                href="/"
                className="block text-white/70 transition-colors duration-300 ease-settle hover:text-white"
              >
                The registry
              </Link>
              <Link
                href="/privacy"
                className="block text-white/70 transition-colors duration-300 ease-settle hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="block text-white/70 transition-colors duration-300 ease-settle hover:text-white"
              >
                Terms
              </Link>
            </div>
          </nav>

          <div className="space-y-2 text-sm">
            <p className="text-white/55">Reach me</p>
            <a
              href={PROFILE.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 transition-colors duration-300 ease-settle hover:text-white"
            >
              <Globe size={15} weight="regular" aria-hidden="true" />
              {PROFILE.twitterHandle}
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 transition-colors duration-300 ease-settle hover:text-white"
            >
              <GithubLogo size={15} weight="regular" aria-hidden="true" />
              {PROFILE.handle}
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-2 break-all text-white/70 transition-colors duration-300 ease-settle hover:text-white"
            >
              <EnvelopeSimple size={15} weight="regular" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 text-sm text-white/55">
          <p>
            © {new Date().getFullYear()} {PROFILE.handle}
          </p>
          <p>Estimates on this page are not a quote.</p>
        </div>
      </div>
    </footer>
  )
}
