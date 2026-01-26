module.exports = {
  name: "FarSend",
  slug: "farsend",
  description: "Multi-chain batch sender for ETH and ERC-20 tokens built as a Farcaster Mini App. Send tokens to multiple addresses in one transaction with CSV/JSON import, automatic validation, and gas-optimized smart contracts on Base.",
  category: ["DeFi", "Utility", "Farcaster"],
  tags: ["batch-sender", "ethereum", "base", "erc20", "farcaster", "airdrop", "web3", "defi"],
  status: "production",
  visibility: "public",
  liveUrl: "https://farsend.vercel.app",
  github: "https://github.com/CryptoExplor/farsend",
  launched: "2026-01-26",
  
  // Featured project
  featured: true,
  
  // Farcaster integration
  farcaster: "https://farcaster.xyz/miniapps/8BszfIpBviDs/farsend",
  
  // Web3 metadata
  chains: ["base", "ethereum", "optimism", "arbitrum"],
  
  deployment: {
    base: {
      address: "0x8878b70a01bdda92ab8ea48dd7893b64c69298c0",
      explorer: "https://basescan.org/address/0x8878b70a01bdda92ab8ea48dd7893b64c69298c0"
    }
  },
  
  // Detailed features
  features: [
    "📤 Batch Transfers - Send ETH/ERC-20 to multiple addresses in one transaction",
    "💰 Gas Optimization - Save 40-60% on gas costs vs individual transfers",
    "📊 Smart Import - CSV/JSON upload with automatic parsing and validation",
    "✅ Address Validation - Automatic Ethereum address checksumming",
    "💎 ERC-20 Support - Send any ERC-20 token with built-in approval workflow",
    "🔗 Wallet Integration - Reown AppKit for seamless multi-wallet connection",
    "📱 Farcaster Native - Full Farcaster Mini App integration",
    "🎉 Live Preview - Review recipients and amounts before dispatching"
  ],
  
  // Use cases
  useCases: [
    "🎁 Community rewards and token distributions",
    "🪂 Airdrops for marketing campaigns",
    "💼 DAO payouts and contributor compensation",
    "🎨 Creator rewards on Farcaster",
    "👥 Team salary and bonus distributions",
    "🎮 Gaming rewards and NFT currency distribution"
  ],
  
  // Input formats supported
  inputFormats: {
    manual: "Line-by-line address and amount entry",
    csv: "CSV file upload with address,amount columns",
    json: "JSON array with address/amount objects",
    text: "Space or comma separated text format"
  },
  
  // Tech stack
  techStack: [
    "Vanilla JavaScript",
    "Ethers.js v6",
    "Tailwind CSS",
    "Reown AppKit (WalletConnect)",
    "Farcaster Mini App SDK",
    "Vercel"
  ],
  
  // Smart contract features
  contractFeatures: {
    functions: [
      "disperseEther() - Batch send ETH",
      "disperseToken() - Batch send ERC-20"
    ],
    gasOptimized: true,
    nonCustodial: true,
    directTransfers: true
  },
  
  // Security features
  security: {
    custody: "Non-custodial - users maintain full control",
    validation: "Client-side address and amount validation",
    balanceCheck: "Pre-flight balance verification",
    approval: "Explicit ERC-20 approval workflow",
    gasEstimation: "Smart gas limits with safety buffers"
  },
  
  stats: {
    github_stars: 0,
    deployments: 1,
    gas_optimized: true,
    security_audit: "internal"
  },
  
  keywords: ["batch-sender", "airdrop", "ethereum", "base", "erc20", "farcaster", "web3", "defi", "gas-optimization"]
}
