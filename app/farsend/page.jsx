import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import {
  ArrowUpRight,
  ArrowSquareOut,
  CheckCircle,
  ShieldCheck,
  Path,
  Cube,
  ChartLineUp,
  GithubLogo,
} from '@phosphor-icons/react/dist/ssr'

import { loadTools } from '@/lib/loadTools'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import SectionReveal from './components/SectionReveal'
import TaglineReveal from './components/TaglineReveal'
import BatchComposer from './components/BatchComposer'

const farsend = loadTools().find(tool => tool.slug === 'farsend')

// Read from public/chains.json in CryptoExplor/FarSend. Every one of these has
// its own deployed contract; the addresses are in CONTRACTS below.
const CHAINS = [
  'Base',
  'Ethereum',
  'Optimism',
  'Arbitrum',
  'Polygon PoS',
  'BNB Smart Chain',
  'Avalanche C-Chain',
  'LitVM LiteForge',
]
// Verified against https://github.com/CryptoExplor/FarSend/blob/main/public/chains.json
const CONTRACTS = [
  { name: 'Base', chainId: 8453, address: '0x8878b70a01bdda92ab8ea48dd7893b64c69298c0', explorer: 'https://basescan.org' },
  { name: 'Ethereum', chainId: 1, address: '0xF2168287245b647DEacA4562e4b80AC78868Ade5', explorer: 'https://etherscan.io' },
  { name: 'Optimism', chainId: 10, address: '0x8e33e8149756D5aA9E81763EAF82bA5702B6Ab50', explorer: 'https://optimistic.etherscan.io' },
  { name: 'Arbitrum', chainId: 42161, address: '0xa3781e8cd25b5E7741E2903b24e5B7157938594d', explorer: 'https://arbiscan.io' },
  { name: 'Polygon PoS', chainId: 137, address: '0x9EEf8a9117272c1b5c4A4181f888000637317ea8', explorer: 'https://polygonscan.com' },
  { name: 'BNB Smart Chain', chainId: 56, address: '0x0a9a78d663593Fd521C0DC69d5206d35B6287143', explorer: 'https://bscscan.com' },
  { name: 'Avalanche C-Chain', chainId: 43114, address: '0x099B63ed3B51149ca8e2e77Eb4Cd6186AC4dd782', explorer: 'https://snowtrace.io' },
  { name: 'LitVM LiteForge', chainId: 4441, address: '0xeb0EB0986AC42831F62856a0E90a6B9B0A4fe492', explorer: 'https://liteforge.explorer.caldera.xyz' },
]
const APP_URL = farsend?.liveUrl ?? 'https://farsend.vercel.app'
const REPO_URL = farsend?.github ?? 'https://github.com/CryptoExplor/farsend'
const LAUNCHED = '26 January 2026'

export const metadata = {
  title: 'FarSend: batch send ETH and ERC20 in one transaction',
  description:
    'FarSend batches ETH and ERC20 payouts into a single transaction across 8 networks including Base, Ethereum, Optimism and Arbitrum. Import a CSV, review the total, sign once.',
  keywords: [
    'batch sender',
    'batch send ERC20',
    'airdrop tool',
    'multisend',
    'base',
    'ethereum',
    'optimism',
    'arbitrum',
    'polygon',
    'bnb chain',
    'avalanche',
    'farcaster mini app',
  ],
  alternates: { canonical: '/farsend' },
  openGraph: {
    title: 'FarSend: pay your whole list in one transaction',
    description:
      'Batch ETH and ERC20 payouts into one signed transaction. Paste a list, check the total, send.',
    url: 'https://cryptoexplor.vercel.app/farsend',
    siteName: 'FarSend',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FarSend: pay your whole list in one transaction',
    description:
      'Batch ETH and ERC20 payouts into one signed transaction. Paste a list, check the total, send.',
    creator: '@kumar14700',
  },
}

export const viewport = {
  themeColor: '#181818',
}

const BENEFITS = [
  {
    icon: Path,
    title: 'One signature for the whole list',
    body: 'Forty recipients or four hundred, the transaction count stays at one. The wallet opens once.',
  },
  {
    icon: Cube,
    title: 'Up to 40% less gas',
    body: 'Every transfer you send separately pays its own 21,000 base cost. A batch pays it once, which is about 36% saved at ten recipients and close to 40% on long lists.',
  },
  {
    icon: CheckCircle,
    title: 'Checked before you sign',
    body: 'Every line is checksummed, every amount validated, every duplicate caught, all before the wallet opens.',
  },
  {
    icon: ChartLineUp,
    title: 'Fixed amounts or a range',
    body: 'Pay everyone the same, or spread a total across a minimum and maximum so no two recipients receive an identical figure.',
  },
  {
    icon: ShieldCheck,
    title: 'Nothing sits between calls',
    body: 'ETH goes from your wallet to each recipient directly. ERC20 totals are pulled in, paid out and any remainder refunded inside the same transaction. No escrow, no account.',
  },
]

const STEPS = [
  {
    title: 'Import the list',
    body: 'Paste rows, drop a CSV or a JSON array, or apply one amount to the whole list. Extra columns are pointed out rather than silently dropped.',
  },
  {
    title: 'Review the batch',
    body: 'Totals, gas estimate and every recipient in one view. Amounts can be fixed or spread across a minimum and maximum range. Anything that would bounce is flagged with the reason.',
  },
  {
    title: 'Sign once',
    body: 'The wallet opens for a single transaction and the contract pays each address in turn.',
  },
]

const FAQS = [
  {
    q: 'How much does a batch cost?',
    a: 'One transaction fee instead of one per recipient, and the saving grows with the list because each standalone ERC20 transfer would carry its own 21,000 base cost: about 20% saved at two recipients, 36% at ten, and close to 40% on long lists. Batching a single transfer saves nothing. The preview on this page models 51,000 gas for a standalone transfer against 30,500 per batched recipient plus a 21,000 base, so you can check the maths against your own list.',
  },
  {
    q: 'Which chains does it work on?',
    a: 'Eight networks, each with its own deployed contract: Base, Ethereum, Optimism, Arbitrum, Polygon PoS, BNB Smart Chain, Avalanche C-Chain and LitVM LiteForge. The addresses are listed further up this page and link to each explorer.',
  },
  {
    q: 'Do I need an account to send?',
    a: 'No. Connect a wallet and paste your list. There is no signup, no email step and no server side copy of your recipients.',
  },
  {
    q: 'Does my list get uploaded anywhere?',
    a: 'Parsing, checksumming and gas estimation all run in your browser. Only the finished transaction is sent to the network.',
  },
  {
    q: 'What happens when an address is wrong?',
    a: 'The line is flagged with the reason, left out of the total, and the send button stays disabled until it is fixed. A wrong character is a payment that never arrives, so the check happens before anything is signed.',
  },
  {
    q: 'Can I send ERC20 tokens, not only ETH?',
    a: 'Yes. The first send of a token asks for one approval, then every batch after that is a single disperse call.',
  },
  {
    q: 'Is the contract audited?',
    a: 'The contract has not been audited by a third party. It is short enough to read in one sitting: two functions, no owner, no pause, no withdraw. Note that an ERC20 batch pulls the total into the contract and pays it out within the same transaction, so the contract holds tokens mid-call and refunds any remainder before returning. Send a small batch first, then scale up.',
  },
  {
    q: 'How many recipients fit in one batch?',
    a: 'The limit is the block gas limit, not the app. A few hundred recipients works on Base. For larger runs the app splits the list into chunks and tells you the count before you sign.',
  },
]

export default function FarSendPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FarSend',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web, Farcaster',
    url: APP_URL,
    description:
      'Batch sender for ETH and ERC20 payouts. One transaction for the whole list, on Base, Ethereum, Optimism and Arbitrum.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <div
      className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-surface-1 font-sans text-white antialiased`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, appSchema]) }}
      />

      <SiteNav />

      <main id="main">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:pt-40">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-2 text-sm text-white/70">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live on Base since {LAUNCHED}
          </p>

          <h1 className="max-w-[680px] bg-gradient-to-r from-white to-[#9B9B9B] bg-clip-text text-5xl font-semibold leading-[1.02] tracking-tight text-transparent sm:text-6xl">
            Pay your whole list
            <br />
            in one transaction.
          </h1>

          <p className="mt-6 max-w-[680px] text-lg text-white/60">
            FarSend turns a spreadsheet of addresses and amounts into a single signed transaction
            across {CHAINS.length} networks, including {CHAINS[0]}, {CHAINS[1]} and {CHAINS[2]}. Import
            a CSV, check the total, send.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={APP_URL}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-base font-semibold text-surface-1 transition-colors duration-300 ease-settle hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Open batch sender
              <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors duration-300 ease-settle hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <GithubLogo size={16} weight="regular" aria-hidden="true" />
              Read the contract
            </a>
            <span className="text-sm text-white/55">
              No signup, no email, nothing held in escrow.
            </span>
          </div>

          <div className="mt-12">
            <BatchComposer />
          </div>
        </section>

        {/* ── Chain strip ────────────────────────────────────────── */}
        <section aria-label="Supported chains" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl bg-surface-2 px-6 py-4">
            <span className="text-sm text-white/55">Settles on</span>
            {CHAINS.map(chain => (
              <span key={chain} className="text-base font-medium text-white/75">
                {chain}
              </span>
            ))}
            <span className="ml-auto hidden text-sm text-white/55 sm:block">
              as a Farcaster Mini App and on the web
            </span>
          </div>
        </section>

        {/* ── Problem to solution ────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <SectionReveal className="lg:col-span-5">
              <h2 className="max-w-[680px] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                The copy and paste tax
              </h2>
            </SectionReveal>
            <SectionReveal className="lg:col-span-7" delay={80}>
              <p className="max-w-[680px] text-lg leading-relaxed text-white/60">
                Paying forty people from a wallet means forty signatures, forty fees and forty
                chances to paste the wrong address. FarSend reads the list once, checksums every
                address, totals the amount and estimates gas before your wallet opens. You
                review one batch and sign it once.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* ── Benefits ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-24" aria-labelledby="benefits-heading">
          <h2
            id="benefits-heading"
            className="max-w-[680px] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          >
            What changes when the list becomes the transaction
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <SectionReveal key={benefit.title} delay={index * 60}>
                  <div className="h-full rounded-2xl bg-surface-2 p-6">
                    <Icon size={22} weight="regular" className="text-accent" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-white/55">
                      {benefit.body}
                    </p>
                  </div>
                </SectionReveal>
              )
            })}
          </div>
        </section>

        {/* ── Tagline reveal ────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <TaglineReveal
            lines={[
              'Ten payouts or four hundred, the wallet',
              'signs once and the chain settles',
              'the whole list in a single block.',
            ]}
          />
        </section>

        {/* ── How it works ──────────────────────────────────────── */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-24 scroll-mt-24">
          <h2 className="max-w-[680px] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Three steps, one signature
          </h2>

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <SectionReveal key={step.title} as="li" delay={index * 70} className="h-full">
                <div className="h-full rounded-2xl bg-surface-2 p-6">
                  <span className="font-mono text-sm text-accent">{`0${index + 1}`}</span>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/55">{step.body}</p>
                </div>
              </SectionReveal>
            ))}
          </ol>
        </section>

        {/* ── Security and proof ────────────────────────────────── */}
        <section id="security" className="mx-auto max-w-6xl px-6 pb-24 scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <SectionReveal className="lg:col-span-5">
              <h2 className="max-w-[680px] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                What the contract does, and what it does not
              </h2>
              <p className="mt-4 max-w-[680px] text-base leading-relaxed text-white/55">
                Two functions, both public: disperseEther and disperseToken. No owner, no pause
                switch, no withdraw path. ERC20 batches move tokens through the contract inside one
                transaction and refund the remainder before returning.
              </p>
            </SectionReveal>

            <SectionReveal className="lg:col-span-7" delay={80}>
              <div className="overflow-hidden rounded-2xl bg-surface-2">
                <div className="grid grid-cols-[1fr_auto] gap-x-4 px-6 pb-2 pt-5 text-sm text-white/55">
                  <span>Network</span>
                  <span>Contract</span>
                </div>
                <ul className="divide-y divide-surface-3">
                  {CONTRACTS.map(contract => (
                    <li
                      key={contract.chainId}
                      className="grid grid-cols-[1fr_auto] items-center gap-x-4 px-6 py-3"
                    >
                      <span className="text-base text-white/80">{contract.name}</span>
                      <a
                        href={`${contract.explorer}/address/${contract.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-sm text-white/60 transition-colors duration-300 ease-settle hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {contract.address.slice(0, 6)}…{contract.address.slice(-4)}
                        <ArrowSquareOut size={13} weight="regular" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 max-w-[680px] text-sm leading-relaxed text-white/55">
                Source is public and short. Read it, verify the addresses, and send a small batch
                before a large one.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section id="faq" className="mx-auto max-w-6xl px-6 pb-24 scroll-mt-24">
          <h2 className="max-w-[680px] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Questions worth asking before you send
          </h2>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {FAQS.map((item, index) => (
              <SectionReveal key={item.q} delay={(index % 2) * 60}>
                <details className="group h-full rounded-2xl bg-surface-2 p-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-white marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-white/55 transition-transform duration-500 ease-settle group-open:rotate-45"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-white/55">{item.a}</p>
                </details>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <SectionReveal>
            <div className="rounded-2xl bg-surface-2 px-6 py-16 text-center">
              <h2 className="mx-auto max-w-[680px] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Pay your whole list in one transaction.
              </h2>
              <p className="mx-auto mt-4 max-w-[680px] text-lg text-white/55">
                Connect a wallet, paste the list, sign once. Nothing to install and nothing to
                sign up for.
              </p>
              <a
                href={APP_URL}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-base font-semibold text-surface-1 transition-colors duration-300 ease-settle hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Open batch sender
                <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </SectionReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
