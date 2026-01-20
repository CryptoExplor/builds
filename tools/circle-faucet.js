module.exports = {
  name: "Circle Faucet",
  slug: "circle-faucet",
  description:
    "A secure, API-key–powered USDC/EURC faucet built on Circle APIs, supporting per-user API keys, admin-protected default keys, rate limiting, and multi-network token distribution with abuse protection.",
  
  category: ["Faucet", "Web3", "Infrastructure"],
  
  tags: [
    "circle",
    "usdc",
    "eurc",
    "faucet",
    "api",
    "web3",
    "stablecoin",
    "testnet",
    "infrastructure"
  ],
  
  status: "production",
  visibility: "public",
  
  liveUrl: "https://circle-api-faucet.vercel.app",
  github: "https://github.com/CryptoExplor/Circle-Faucet",
  
  launched: "2026-01-20",

  // Featured in your tools directory
  featured: true,

  // Supported assets & chains
  chains: [
    "ethereum",
    "polygon",
    "avalanche",
    "arbitrum",
    "optimism",
    "base"
  ],

  assets: ["USDC", "EURC"],

  // Faucet configuration
  faucet: {
    claimLimit: "5 claims per API key per 24 hours",
    cooldown: "24 hours per wallet",
    amount: {
      usdc: "Configurable (admin controlled)",
      eurc: "Configurable (admin controlled)"
    }
  },

  // Security & access control
  security: {
    userApiKeys: true,
    adminApiKeys: true,
    adminPasswordProtected: true,
    rateLimiting: true,
    abusePrevention: [
      "per-api-key limits",
      "per-wallet cooldown",
      "server-side validation",
      "Vercel environment isolation"
    ]
  },

  // Core features
  features: [
    "🔑 User-Supplied Circle API Keys – Users claim using their own API credentials",
    "🛡️ Admin-Protected Default Keys – Optional fallback keys secured by password",
    "⏱️ Rate Limiting – Max 5 claims per API key every 24 hours",
    "🌍 Multi-Network Support – Ethereum, Polygon, Arbitrum, Optimism, Base",
    "💵 Stablecoin Faucet – USDC & EURC distribution via Circle APIs",
    "📊 Claim Tracking – Per-key and per-wallet usage monitoring",
    "🚀 Vercel-Optimized – Serverless, fast, and globally distributed"
  ],

  // Tech stack
  techStack: [
    "Node.js",
    "Express",
    "Circle API",
    "Vercel Serverless Functions",
    "Vercel Environment Variables",
    "Redis / KV (rate limiting)",
    "Vanilla JS frontend"
  ],

  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "internal"
  },

  keywords: [
    "circle",
    "usdc",
    "eurc",
    "faucet",
    "stablecoin",
    "web3",
    "infrastructure",
    "api"
  ]
};
