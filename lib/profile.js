/**
 * Profile & org data for the CryptoExplor GitHub account.
 *
 * Every value here is sourced from one of two places, checked 2026-10-27:
 *   1. GET https://api.github.com/users/CryptoExplor          -> name, bio, location, blog,
 *                                                                twitter_username, public_repos
 *   2. The README of https://github.com/CryptoExplor/CryptoExplor
 *                                                             -> tagline, focus areas, signals,
 *                                                                mini app list, flagship projects
 *
 * Update this file when the GitHub profile README changes; the homepage and footer read from it.
 */

export const PROFILE = {
  // From the GitHub user API
  handle: 'CryptoExplor',
  name: 'Ravi',
  bio: "Don't know much",
  location: 'India',
  website: 'https://cryptoexplor.vercel.app',
  email: 'ravikumar699121@gmail.com',
  github: 'https://github.com/CryptoExplor',
  twitter: 'https://x.com/kumar14700',
  twitterHandle: '@kumar14700',
  farcaster: 'https://farcaster.xyz/dare1.eth',
  farcasterHandle: 'dare1.eth',
  // public_repos from the user API (includes forks and small experiments)
  publicRepos: 40,
  accountSince: '2022-04-02',

  // From the profile README
  tagline: 'Web3 Automation Infrastructure Builder',
  positioning:
    'Building stealth, scalable, and onchain systems across Farcaster, Base, Celo, Stacks, and EVM.',
  philosophy:
    'Building automation systems that execute on-chain — not dashboards that wait for clicks.',
  approach: 'AI-accelerated. Automation-first. Built to operate at scale.',

  focusAreas: [
    {
      title: 'Farcaster Mini Apps',
      detail: 'Production-ready, live on Farcaster',
    },
    {
      title: 'Stealth Automation Engines',
      detail: 'Multi-wallet, persona-driven, bot-resistant',
    },
    {
      title: 'On-chain Tooling',
      detail: 'NFT infra, batch senders, wallet simulators',
    },
    {
      title: 'Multi-chain Deployment Pipelines',
      detail: 'EVM automation at speed',
    },
  ],

  // "Signals" section of the profile README
  signals: [
    '6 live mini apps running on Farcaster',
    'Cross-chain production deployments across Base, Celo, and Stacks',
    'Consistent shipping cadence across tools, infra, and experiments',
  ],

  // "Edge" section of the profile README
  edge: [
    'Use AI as a force multiplier to compress build time',
    'Design automation systems, not manual workflows',
    'Prioritize execution over interfaces',
    'Build multi-chain systems from day one',
  ],

  // The six mini apps listed in the profile README, with their launch links
  miniApps: [
    {
      name: 'FarSend',
      detail: 'Batch ETH sender — privacy + simplicity',
      url: 'https://farcaster.xyz/miniapps/8BszfIpBviDs/farsend',
    },
    {
      name: 'Celo NFT',
      detail: 'Mint NFTs on Celo, live CELO price feed',
      url: 'https://farcaster.xyz/miniapps/Tip8ngTAKnHC/celo-nft',
    },
    {
      name: 'CastWeather',
      detail: 'Real-time weather, web3 community layer',
      url: 'https://farcaster.xyz/miniapps/EqlgelQ1dlTV/castweather',
    },
    {
      name: 'Intuition Counter',
      detail: 'Evolving Badge NFT with Top-50 leaderboard',
      url: 'https://farcaster.xyz/miniapps/WRKou2E_oREh/intuition-counter',
    },
    {
      name: 'Nexus Counter',
      detail: 'On-chain counter with multi-wallet support',
      url: 'https://farcaster.xyz/miniapps/Nf8kjDxT6YXs/nexus-counter',
    },
    {
      name: 'Calculator',
      detail: 'Basic calculator, reimagined for Farcaster',
      url: 'https://farcaster.xyz/miniapps/nuT5EZUTr_YW/calculator',
    },
  ],

  // Flagship projects called out in the profile README, mapped to registry slugs
  flagship: [
    {
      slug: 'farsend',
      role: 'Multi-chain Batch Sender',
      detail:
        'Batch-send ETH and ERC-20 tokens across multiple chains from a single interface. Privacy-first, gas-efficient, live on Farcaster Mini Apps.',
    },
    {
      slug: 'farmlabs',
      role: 'On-chain Behavior Simulation Engine',
      detail:
        'Core system for simulating real-user on-chain behavior — persona-driven wallets, stealth timing, multi-chain support.',
    },
    {
      slug: 'voidmasks',
      role: 'Permissionless On-chain NFT Collection',
      detail:
        '10,000 supply NFT collection on Stacks with deterministic on-chain SVG art generation. Fully permissionless mint, no IPFS dependency.',
    },
  ],

  chains: ['Farcaster', 'Base', 'Celo', 'Stacks', 'EVM'],
}

export default PROFILE
