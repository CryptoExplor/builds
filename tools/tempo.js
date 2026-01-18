module.exports = {
  name: "Tempo Testnet DAPP",
  slug: "tempo",
  description: "A comprehensive testnet-only console for manual onchain actions on Tempo blockchain: faucets, swaps, NFTs, batch transfers, liquidity management, and more. Built for developers testing DeFi operations on the Moderato testnet.",
  category: ["Blockchain", "DevTools", "DeFi"],
  tags: ["tempo", "testnet", "defi", "dex", "nft", "liquidity", "swap", "faucet", "evm"],
  status: "production",
  visibility: "public",
  liveUrl: "https://tempo.xyz",
  github: "https://github.com/CryptoExplor/tempo",
  launched: "2024-12-20",
  
  // Featured project
  featured: false,
  
  // Web3 metadata
  chains: ["tempo-moderato"],
  
  // Detailed features for showcase
  features: [
    "💰 Token Management - Faucet, send, batch transfer, create tokens",
    "🔄 Trading & Swaps - Exchange tokens with auto-liquidity creation",
    "🎨 NFT Minting - Claim Tempo's official testnet NFTs",
    "📊 Limit Orders - Place bid/ask orders on the DEX",
    "🏊 Liquidity Pools - Add/remove liquidity from pools",
    "🔐 TIP-403 Policies - Create transfer policies (whitelist/blacklist)",
    "🌐 Domain Names - Register .tempo domain names",
    "📈 Statistics - View detailed wallet and network analytics"
  ],
  
  // Tech stack
  techStack: ["Vanilla JavaScript", "TailwindCSS", "Ethers.js v5.7.2", "MetaMask"],
  
  // Network details
  networkInfo: {
    name: "Tempo Moderato Testnet",
    rpcUrl: "https://rpc.moderato.tempo.xyz",
    chainId: "42431",
    explorer: "https://explore.tempo.xyz",
    nativeToken: "TEMPO"
  },
  
  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "none"
  },
  
  keywords: ["tempo", "testnet", "blockchain", "defi", "developer-tools", "evm", "web3"]
}
