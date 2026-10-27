/**
 * Base Mint — NFT Battle Arena
 * Facts sourced from https://github.com/CryptoExplor/NFT-mini-app README
 * and the repo's `homepage` field (https://base-mintapp.vercel.app), checked 2026-10-27.
 */
module.exports = {
  name: "Base Mint — NFT Battle Arena",
  slug: "base-mint",
  description: "Cross-collection NFT battle game on Base. Pick any NFT from any collection and enter the arena — universal stat normalization, passive abilities, AI opponents, and SHA-256 anti-cheat snapshots, with minting, an OpenSea gallery, and Farcaster Mini App integration.",
  category: ["NFT", "Gaming", "Web3"],
  tags: ["base", "nft", "battle-arena", "gaming", "opensea", "farcaster", "miniapp", "siwe", "wagmi"],
  status: "beta",
  visibility: "public",
  liveUrl: "https://base-mintapp.vercel.app",
  github: "https://github.com/CryptoExplor/NFT-mini-app",
  launched: "2025-10-20",

  featured: false,

  chains: ["base"],

  features: [
    "⚔️ Battle Arena - Real-time turn-based battles between NFTs from different collections",
    "📐 Universal Stat Normalization - Every NFT (Base Invaders, BaseHeads 404, BaseMoods, VoidPFPs, and more) converts into HP, ATK, DEF, SPD, CRIT, Dodge, Lifesteal, Regen",
    "🛡️ Passive Abilities - Ghost Step, Iron Wall, Drain, Berserker, Regen Burst, each with cooldowns and trigger conditions",
    "🎬 Animated Combat - Particle effects, floating damage numbers, crit bursts, dodge ghosts, screen shake, slash trails, cinematic round splashes",
    "🤖 AI Opponents - Challenge AI-controlled fighters with configurable win rates",
    "🔐 Anti-Cheat Snapshots - Stat snapshots hashed with SHA-256 to prevent drift abuse",
    "📋 Challenge Board - Post challenges, accept fights, collection-themed card UI",
    "🎨 NFT Minting - Mint from curated Base collections with auto-discovery",
    "🖼️ Bandwidth-Smart OpenSea Gallery - Lazy display previews while browsing, original resolution only after opening an item, opt-in animation playback",
    "🔍 Rich NFT Details - OpenSea rarity rank, estimated value, ownership, traits, trust flags, marketplace links",
    "📊 Reliable Mint Analytics - Browser-persistent outbox, local and OpenSea historical reconciliation, receipt-derived token IDs, no always-on server required",
    "🏆 Points & Gamification - Streaks, status badges, global leaderboards",
    "📣 Social Sharing - Farcaster cast composing, share cards, replay-to-play conversion",
    "📱 Farcaster Mini App - Native integration with Farcaster frames"
  ],

  techStack: [
    "Vite",
    "Vanilla JS",
    "Tailwind CSS",
    "Reown AppKit",
    "Wagmi",
    "Viem",
    "SIWE",
    "Vercel Serverless Functions",
    "Vercel KV (Redis)",
    "Web Crypto API (SHA-256)"
  ],

  notes: [
    "Built for the Base Batches 003 Student Track.",
    "Anything prefixed VITE_ is compiled into the client bundle and is public — the CI build fails if a server-only key shows up in dist/."
  ],

  stats: {
    github_stars: 0,
    deployments: 1,
    gas_optimized: false,
    security_audit: "none"
  },

  keywords: ["base", "nft", "battle-arena", "gaming", "opensea", "farcaster", "mini-app", "siwe", "wagmi", "viem"]
}
