module.exports = {
  name: "VOIDMASKS",
  slug: "voidmasks",
  description: "A Phase-8 schizocore PFP collection with 100% on-chain SVG generation on Stacks blockchain. Each mask is generated deterministically using pure mathematics—no IPFS, no external dependencies. Features free mint (one per address), 7-trait system with 1.6M+ unique combinations, and Clarity 4 smart contracts secured by Bitcoin.",
  category: ["NFT", "Art", "Web3"],
  tags: ["nft", "stacks", "bitcoin", "clarity", "on-chain", "svg", "generative-art", "pfp", "sip-009", "deterministic"],
  status: "production",
  visibility: "public",
  liveUrl: "https://voidmasks.vercel.app",
  github: "https://github.com/CryptoExplor/VOIDMASKS",
  launched: "2026-02-01",
  
  // Featured project
  featured: true,
  
  // Custom OG image (update this path to your actual OG image URL)
  ogImage: "https://voidmasks.vercel.app/og-image.png",
  
  // Web3 metadata
  chains: ["stacks"],
  
  deployment: {
    mainnet: {
      address: "SP3ZQXJPR493FCYNAVFX1YSK7EMT6JF909EZHVE9A.voidmasks",
      explorer: "https://explorer.hiro.so/txid/SP3ZQXJPR493FCYNAVFX1YSK7EMT6JF909EZHVE9A.voidmasks"
    },
    testnet: {
      address: "ST1HCWN2BWA7HKY61AVPC0EKRB4TH84TMV26A4VRZ.voidmasks",
      explorer: "https://explorer.hiro.so/txid/ST1HCWN2BWA7HKY61AVPC0EKRB4TH84TMV26A4VRZ.voidmasks?chain=testnet"
    }
  },
  
  // Detailed features
  features: [
    "🎨 100% On-Chain SVG - Art generated deterministically from token ID, no IPFS",
    "🔢 1.6M+ Combinations - 7-trait system: expression, mouth, aura, corruption, symbol, palette, background",
    "✅ SIP-009 Compliant - Standard Stacks NFT interface",
    "🔐 Clarity 4 - Latest Clarity version with advanced features",
    "💰 Free Mint - One per address, 10,000 max supply",
    "🔗 Multi-Wallet - Leather & Xverse wallet support",
    "🌐 Network Toggle - Seamless mainnet/testnet switching",
    "⚡ Gas Optimized - Minimal on-chain footprint with efficient SVG generation"
  ],
  
  // On-chain generation system
  generationSystem: {
    traits: [
      { name: "Expression", variants: 10, description: "Eye styles" },
      { name: "Mouth", variants: 9, description: "Mouth shapes" },
      { name: "Aura", variants: 8, description: "Surrounding effects" },
      { name: "Corruption", variants: 6, description: "Glitch elements" },
      { name: "Symbol", variants: 6, description: "Forehead marks" },
      { name: "Palette", variants: 8, description: "Color schemes" },
      { name: "Background", variants: 8, description: "Background colors" }
    ],
    totalCombinations: "1,658,880 unique masks",
    algorithm: "Deterministic trait calculation from token ID using modulo operations",
    storage: "SVG layers concatenated on-chain in Clarity contract"
  },
  
  // Smart contract features
  contractFeatures: {
    functions: [
      "mint() - Free mint (one per address)",
      "transfer() - Transfer NFT to another address",
      "get-svg() - Generate complete SVG on-chain",
      "get-traits() - Get all trait values for a token",
      "get-owner() - Get owner of a specific token",
      "has-minted() - Check if address has already minted"
    ],
    standard: "SIP-009 NFT Standard",
    clarityVersion: "4",
    security: "One mint per address enforced on-chain, no admin functions"
  },
  
  // Tech stack
  techStack: [
    "Clarity 4.0 (Smart Contracts)",
    "Vite + Vanilla JavaScript",
    "Stacks.js v7",
    "Leather Wallet Integration",
    "Xverse Wallet Integration",
    "Vercel Serverless Functions",
    "Hiro Stacks API",
    "Deterministic SVG Engine"
  ],
  
  // Architecture highlights
  architecture: {
    frontend: "Modular ES6 with separate config, wallet, contract, SVG, and UI controllers",
    backend: "Serverless API endpoints for metadata and SVG retrieval",
    storage: "100% on-chain, no external dependencies",
    network: "Multi-network support with one-click toggle"
  },
  
  // API endpoints
  apiEndpoints: [
    "/api/metadata/[id] - SIP-009 compliant JSON metadata",
    "/api/svg/[id] - On-chain generated SVG image",
    "/api/debug-svg/[id] - Debug endpoint with trait analysis"
  ],
  
  // Use cases
  useCases: [
    "🖼️ Schizocore PFP collection for profile pictures",
    "🎭 Brutalist digital art collection",
    "📚 Study case for on-chain NFT generation",
    "🔬 Demonstration of Clarity 4 capabilities",
    "💎 Collectible with true on-chain permanence"
  ],
  
  // Design philosophy
  designPhilosophy: {
    aesthetic: "Brutalist schizocore cyberpunk",
    approach: "Pure mathematics, no randomness",
    permanence: "Artwork logic permanent in smart contract",
    accessibility: "Free mint, one per address for fair distribution"
  },
  
  // Security features
  security: {
    custody: "Non-custodial - users maintain full control",
    mintLimit: "One per address enforced on-chain",
    adminFunctions: "No admin functions - fully decentralized",
    immutability: "SVG generation logic is immutable",
    transparency: "All code open source and auditable"
  },
  
  // Network information
  networkInfo: {
    mainnet: {
      network: "Stacks Mainnet",
      security: "Secured by Bitcoin",
      explorer: "https://explorer.hiro.so",
      api: "https://api.hiro.so"
    },
    testnet: {
      network: "Stacks Testnet",
      faucet: "https://stacks-jar.vercel.app",
      explorer: "https://explorer.hiro.so?chain=testnet",
      api: "https://api.testnet.hiro.so"
    }
  },
  
  // Collection stats
  collectionStats: {
    maxSupply: 10000,
    mintCost: "Free (gas only)",
    mintsPerAddress: 1,
    totalTraits: 7,
    uniqueCombinations: 1658880
  },
  
  stats: {
    github_stars: 0,
    deployments: 2, // mainnet + testnet
    gas_optimized: true,
    security_audit: "internal"
  },
  
  keywords: [
    "nft",
    "stacks",
    "bitcoin",
    "clarity",
    "on-chain",
    "svg",
    "generative-art",
    "pfp",
    "sip-009",
    "deterministic",
    "schizocore",
    "brutalist",
    "web3",
    "blockchain-art"
  ]
}
