import Link from 'next/link'
import { GeistSans } from 'geist/font/sans'

import { PROFILE } from '@/lib/profile'

export const metadata = {
  title: 'Privacy',
  description:
    'What this site and FarSend collect, which is close to nothing. No analytics, no cookies, no uploaded recipient lists.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <div
      className={`${GeistSans.variable} min-h-screen bg-surface-1 font-sans text-white antialiased`}
    >
      <main id="main" className="mx-auto max-w-6xl px-6 pb-24 pt-16">
        <Link
          href="/"
          className="text-sm text-white/60 transition-colors duration-300 ease-settle hover:text-white"
        >
          Back to all projects
        </Link>

        <h1 className="mt-8 max-w-[680px] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Privacy
        </h1>
        <p className="mt-4 max-w-[680px] text-lg text-white/55">
          Short version: the pages here do not track you, and a recipient list you paste into
          FarSend never leaves your browser.
        </p>

        <div className="mt-12 grid max-w-[680px] gap-10">
          <Section title="This website">
            Static pages served by Vercel. There is no analytics script, no advertising pixel, no
            cookie and no account. Vercel keeps standard server logs, including IP addresses, for
            security and abuse prevention. That is the only record of a visit.
          </Section>

          <Section title="The batch preview">
            The preview on the FarSend page parses, validates and totals your list inside your
            browser. There is no request to a server and no storage of the addresses you paste.
            Reload the page and the list is gone.
          </Section>

          <Section title="The FarSend app">
            Connecting a wallet shares your public address with the app, as it does with any
            decentralised application. Transactions you sign are public on the chain you use, by
            design. If you import a CSV, the file is read locally and is not uploaded.
          </Section>

          <Section title="Email">
            If you write to {PROFILE.email}, the message and address stay in that mailbox and are
            used only to reply.
          </Section>

          <Section title="Elsewhere">
            Links to GitHub, X, Farcaster and block explorers lead to services with their own
            policies. Nothing here controls what they collect.
          </Section>

          <Section title="Changes">
            If any of this changes, for example if analytics is ever added, this page changes
            first and the date below changes with it.
          </Section>
        </div>

        <p className="mt-12 text-sm text-white/55">Last updated 28 October 2026.</p>
      </main>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-base leading-relaxed text-white/55">{children}</p>
    </section>
  )
}
