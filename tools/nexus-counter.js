module.exports = {
  name: "Nexus Counter dApp",
  slug: "nexus-counter",
  description: "A decentralized counter application on Nexus Testnet with gamified badge NFTs, top-20 leaderboard, cooldown enforcement, and multi-wallet support (MetaMask, Farcaster, WalletConnect). Features 7-tier badge system and Farcaster Mini App integration.",
  category: ["dApp", "Gaming", "NFT"],
  tags: ["nexus", "dapp", "counter", "nft", "badges", "leaderboard", "farcaster", "web3"],
  status: "production",
  visibility: "public",
  liveUrl: "https://nexus-counter.vercel.app",
  github: "https://github.com/CryptoExplor/nexus-counter-app",
  launched: "2025-01-10",
  
  // Farcaster integration
  farcaster: "https://warpcast.com/~/composers?embeds[]=https://nexus-counter.vercel.app",
  
  // Deployment
  chains: ["nexus-testnet"],
  
  deployment: {
    "nexus-testnet": {
      address: "0x6DDc7dd77CbeeA3445b70CB04E0244BBa245e011",
      explorer: "https://testnet3.explorer.nexus.xyz/address/0x6DDc7dd77CbeeA3445b70CB04E0244BBa245e011"
    }
  },
  
  // Features
  features: [
    "🎮 Global Counter - Decentralized increment/decrement with blockchain state",
    "🏆 Badge NFT System - 7 tiers: Bronze, Silver, Gold, Platinum, Diamond, Master, Legendary",
    "📊 Top-20 Leaderboard - Real-time rankings by total actions",
    "⏱️ Cooldown Mechanism - 1-hour wait between actions per user",
    "💰 Fee System - Small NEX fee for each transaction",
    "🔗 Multi-Wallet - Browser extensions, Farcaster, WalletConnect support",
    "📱 Farcaster Mini App - Native integration for Farcaster users",
    "🔐 Admin Controls - Owner-only reset functionality"
  ],
  
  // Badge tiers
  badgeSystem: {
    bronze: "10+ actions",
    silver: "25+ actions",
    gold: "50+ actions",
    platinum: "100+ actions",
    diamond: "250+ actions",
    master: "500+ actions",
    legendary: "1000+ actions"
  },
  
  // Tech stack
  techStack: [
    "Wagmi Core",
    "Viem",
    "Solidity ^0.8.0",
    "Tailwind CSS",
    "Farcaster Mini App SDK",
    "WalletConnect v2"
  ],
  
  // Network info
  networkInfo: {
    name: "Nexus Testnet",
    chainId: "3940",
    rpcUrl: "Alchemy-powered Nexus RPC",
    explorer: "https://testnet3.explorer.nexus.xyz",
    faucet: "https://hub.nexus.xyz/"
  },
  
  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "none"
  },
  
  keywords: ["nexus", "dapp", "counter", "nft", "badges", "gaming", "farcaster", "web3"]
}
