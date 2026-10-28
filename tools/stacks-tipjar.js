module.exports = {
  name: "Stacks Tip Jar",
  slug: "stacks-tipjar",
  description: "A production-ready tip jar dApp built on Stacks (Bitcoin L2) with Clarity 4 features including on-chain memos, custom UTF-8 messages, transaction history, premium tipper badges, and Farcaster Frame integration. Features modular ES6 architecture and multi-wallet support.",
  category: ["dApp", "DeFi", "Social"],
  tags: ["stacks", "bitcoin", "clarity", "tipjar", "dapp", "farcaster", "web3"],
  status: "production",
  visibility: "public",
  liveUrl: "https://stacks-jar.vercel.app",
  // Canonical repo casing: Stacks-Tip-Jar
  github: "https://github.com/CryptoExplor/Stacks-Tip-Jar",
  launched: "2025-12-22",
  
  // Deployment
  chains: ["stacks"],
  
  deployment: {
    stacks: {
      address: "ST3ZQXJPR493FCYNAVFX1YSK7EMT6JF909E3SDNQG.tip-jar-v4",
      explorer: "https://explorer.hiro.so/txid/ST3ZQXJPR493FCYNAVFX1YSK7EMT6JF909E3SDNQG.tip-jar-v4"
    }
  },
  
  // Features
  features: [
    "Accept Tips - Receive STX tips with custom on-chain messages",
    "UTF-8 Messages - Send tips with custom messages up to 280 characters",
    "Premium Badges - Unlock premium status with 10+ STX in total tips",
    "Transaction History - Full on-chain transaction history with messages",
    "Secure Withdrawals - Owner-only with post-conditions",
    "Multi-Wallet - Leather and Xverse wallet support",
    "Real-time Stats - Live balance, tip count, and tipper tracking",
    "Farcaster Ready - Built-in Frame support for social sharing"
  ],
  
  // Clarity 4 features
  clarityFeatures: {
    memos: "34-byte on-chain memos for all transactions",
    messages: "UTF-8 custom messages (280 char limit)",
    history: "Full transaction history storage",
    postConditions: "STX transfer protection",
    consensus: "to-consensus-buff? for data integrity"
  },
  
  // Tech stack
  techStack: [
    "Clarity 4.0",
    "Stacks.js",
    "ES6 Modules",
    "Vanilla JavaScript",
    "Leather Wallet",
    "Xverse Wallet",
    "Hiro API"
  ],
  
  // Security
  security: {
    withdrawals: "Owner-only with validation",
    postConditions: "STX transfer protection",
    timeout: "2-minute transaction timeout",
    networkValidation: "Ensures wallet matches app network"
  },
  
  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "internal"
  },
  
  keywords: ["stacks", "bitcoin", "clarity", "tipjar", "dapp", "farcaster", "web3"]
}
