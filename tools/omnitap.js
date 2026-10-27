/**
 * OmniTap — multichain counter dApp
 * Facts sourced from https://github.com/CryptoExplor/omnitap README, checked 2026-10-27.
 */
module.exports = {
  name: "OmniTap",
  slug: "omnitap",
  description: "Multichain tap-to-earn counter dApp with achievements, leaderboards, and referral rewards. No cooldown — increment or decrement a global counter across Base, Arbitrum, BSC, Celo, and Monad for 0.000001 ETH/token per tap.",
  category: ["Web3", "Gaming", "dApp"],
  tags: ["multichain", "counter", "tap-to-earn", "base", "arbitrum", "bsc", "celo", "monad", "leaderboard"],
  status: "beta",
  visibility: "public",
  liveUrl: "https://omnitap.vercel.app",
  github: "https://github.com/CryptoExplor/omnitap",
  launched: "2025-11-26",

  featured: false,

  chains: ["base", "arbitrum", "bsc", "celo", "monad"],

  features: [
    "⚡ No Cooldown - Tap as fast as you want",
    "🌐 5 Blockchains - Base, Arbitrum, BSC, Celo, Monad",
    "🔄 Instant Actions - Increment or decrement the global counter",
    "💰 Tiny Fees - 0.000001 ETH/token per tap",
    "🎖️ 6 Badge Tiers - Newcomer through Legendary (5000+ taps)",
    "🏅 11 Achievements - Unlock special milestones",
    "🔥 Daily Streaks - Keep your streak alive for bonuses",
    "📊 Top 100 Leaderboard - Per chain plus global rankings",
    "👥 10% Referral Rewards - Earn from referred users' fees",
    "🔗 Unified Multichain - One leaderboard across chains, seamless chain switching, same contracts and rules everywhere"
  ],

  techStack: [
    "JavaScript",
    "Solidity (per-chain contracts)",
    "MetaMask / Coinbase Wallet / WalletConnect",
    "Vercel"
  ],

  notes: [
    "NFT badges are listed as coming soon in the README."
  ],

  stats: {
    github_stars: 0,
    deployments: 5,
    gas_optimized: true,
    security_audit: "none"
  },

  keywords: ["omnitap", "multichain", "tap-to-earn", "counter-dapp", "leaderboard", "base", "arbitrum", "bsc", "celo", "monad"]
}
