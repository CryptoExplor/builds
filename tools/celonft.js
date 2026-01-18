module.exports = {
  name: "CeloNFT",
  slug: "celonft",
  description: "A gamified NFT minting platform on Celo featuring live price snapshots, 60-second price prediction challenges with 2x rewards, smart airdrops with lucky bonuses up to 2x, and comprehensive community features including leaderboards and achievements.",
  category: ["NFT", "DeFi", "Gaming"],
  tags: ["nft", "celo", "prediction", "airdrop", "farcaster", "web3", "gaming", "rewards"],
  status: "production",
  visibility: "public",
  liveUrl: "https://celo-nft-phi.vercel.app",
  github: "https://github.com/CryptoExplor/CeloNFT",
  launched: "2025-11-15",
  
  // Featured project
  featured: true,
  
  // Farcaster integration
  farcaster: "https://farcaster.xyz/miniapps/Tip8ngTAKnHC/celo-nft",
  
  // Web3 metadata
  chains: ["celo"],
  
  deployment: {
    celo: {
      address: "0xe90EC6F3f5C15cC76861CA5d41CD879548208Eff",
      explorer: "https://celoscan.io/address/0xe90EC6F3f5C15cC76861CA5d41CD879548208Eff"
    }
  },
  
  // Detailed features
  features: [
    "🎯 60-Second Price Prediction - Guess UP/DOWN for 2x airdrop rewards",
    "💰 Enhanced Airdrops - 0.005-0.033 CELO with lucky bonuses",
    "🍀 Lucky Token System - Milestones (1.4x), Palindromes (2x), Sequential (1.2x)",
    "🎨 Four-Tier Rarity - Common 60%, Rare 30%, Legendary 9%, Mythic 1%",
    "🏆 Live Leaderboard - Top 10 collectors with rarity breakdowns",
    "🏅 10 Achievements - Unlock badges for milestones and rarities",
    "📊 TradingView Charts - Real-time CELO/USD price integration",
    "📱 Farcaster Mini App - Native cast composer integration"
  ],
  
  // Game mechanics
  gameMechanics: {
    predictionRewards: {
      correct: "2x airdrop multiplier",
      wrong: "0.5x consolation prize",
      skip: "Standard 1x airdrop"
    },
    luckyBonuses: {
      milestones: "1.4x (100, 250, 500, 1000+)",
      palindromes: "2x (121, 1331, etc.)",
      sequential: "1.2x (123, 4567, etc.)",
      luckyNumbers: "1.2x (77, 111, 222+)"
    },
    rarityMultipliers: {
      common: "1.0x",
      rare: "1.1x",
      legendary: "1.25x",
      mythic: "2.0x"
    }
  },
  
  // Tech stack
  techStack: [
    "Vite + Vanilla JS",
    "wagmi v2.13.4 + viem v2.21.0",
    "Reown AppKit (WalletConnect v2)",
    "@farcaster/miniapp-sdk",
    "Vercel Serverless Functions",
    "Vercel KV (Redis)",
    "OpenZeppelin ERC-721"
  ],
  
  stats: {
    github_stars: 0,
    deployments: 2,
    security_audit: "none"
  },
  
  keywords: ["nft", "celo", "gaming", "prediction", "airdrop", "farcaster", "web3", "defi"]
}
