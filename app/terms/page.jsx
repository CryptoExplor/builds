import Link from 'next/link'
import { GeistSans } from 'geist/font/sans'

import { PROFILE } from '@/lib/profile'

export const metadata = {
  title: 'Terms',
  description:
    'Terms for using this site and FarSend. Open source, no warranty, and every transaction you sign is final.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
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
          Terms
        </h1>
        <p className="mt-4 max-w-[680px] text-lg text-white/55">
          FarSend is open source software you run in your own browser. You sign your own
          transactions and you keep custody of your own funds throughout.
        </p>

        <div className="mt-12 grid max-w-[680px] gap-10">
          <Section title="What you are using">
            A web app and public smart contracts on eight networks. The source is on GitHub and
            readable by anyone. The contract file declares the MIT licence in its SPDX header; the
            repository as a whole carries no top level licence file, so treat the code as published
            for reading and verification rather than for reuse.
          </Section>

          <Section title="Your responsibility">
            Addresses, amounts and the chain you send on are your call. Transactions on a
            blockchain are final and cannot be reversed by me or by anyone else. Check the list,
            start with a small batch, and confirm the details in your wallet before signing.
          </Section>

          <Section title="Estimates are not quotes">
            Gas figures and savings shown on this site are estimates from a fixed model. The real
            cost appears in your wallet at signing time and changes with network conditions.
          </Section>

          <Section title="No warranty">
            The software is provided as is, without warranty of any kind. To the extent permitted
            by law, I am not liable for lost funds, failed transactions, or losses arising from
            using this site or the contract.
          </Section>

          <Section title="Not advice">
            Nothing here is financial, legal or tax advice.
          </Section>

          <Section title="Contact">
            Questions go to {PROFILE.email}.
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
