module.exports = {
  name: "Intuition Counter dApp",
  slug: "intuition-counter",
  description: "A decentralized counter application built as a Farcaster Mini App featuring evolving badge NFTs based on interaction levels, a top-50 leaderboard, seamless wallet integration, and gamified blockchain interactions with real-time updates.",
  category: ["dApp", "Gaming", "NFT"],
  tags: ["intuition", "counter", "dapp", "nft", "badges", "farcaster", "web3", "gaming"],
  status: "production",
  visibility: "public",
  liveUrl: "https://intuition-counter.vercel.app",
  github: "https://github.com/CryptoExplor/intuition-counter",
  launched: "2025-10-23",
  
  // Farcaster integration
  farcaster: "https://farcaster.xyz/miniapps/WRKou2E_oREh/intuition-counter",
  
  // Features
  features: [
    "🔢 Global Counter - Decentralized increment/decrement functionality",
    "🏅 Evolving Badges - NFTs that evolve based on interaction count",
    "📊 Top-50 Leaderboard - Global ranking by total interactions",
    "🎨 4-Tier Badge System - Bronze (0-10), Silver (11-50), Gold (51-100), Platinum (100+)",
    "🔗 Wallet Integration - Seamless Web3 wallet connection",
    "📱 Farcaster Mini App - Native Farcaster Frame integration",
    "⚡ Real-time Updates - Live counter and leaderboard synchronization",
    "🛡️ Admin Controls - Administrative functions for dApp management"
  ],
  
  // Badge tiers
  badgeSystem: {
    bronze: "0-10 interactions",
    silver: "11-50 interactions",
    gold: "51-100 interactions",
    platinum: "100+ interactions"
  },
  
  // Tech stack
  techStack: [
    "Solidity",
    "Web3.js",
    "Vanilla JavaScript",
    "Farcaster Frame SDK",
    "Vercel"
  ],
  
  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "none"
  },
  
  keywords: ["intuition", "counter", "dapp", "nft", "badges", "farcaster", "gaming", "web3"]
}
