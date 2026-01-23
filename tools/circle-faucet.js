module.exports = {
  name: "Circle Faucet",
  slug: "circle-faucet",
  description: "A secure, serverless multi-key testnet token claimer built on Circle APIs with password-protected default keys, round-robin API key rotation, automatic fallback, and persistent analytics powered by Vercel KV (Redis). Supports USDC/EURC distribution across 10+ networks.",
  category: ["Faucet", "Web3", "Infrastructure"],
  tags: ["circle", "usdc", "eurc", "faucet", "api", "web3", "stablecoin", "testnet", "infrastructure", "vercel-kv"],
  status: "production",
  visibility: "public",
  liveUrl: "https://circle-api-faucet.vercel.app",
  github: "https://github.com/CryptoExplor/Circle-Faucet",
  launched: "2026-01-20",
  
  // Featured project
  featured: true,
  
  // Supported networks
  chains: ["ethereum", "polygon", "avalanche", "arbitrum", "optimism", "base", "solana", "aptos"],
  
  // Detailed features
  features: [
    "🔑 Dual Mode - User API keys (unlimited) or password-protected default faucet (1/24h)",
    "🔄 Smart Key Rotation - Round-robin distribution across multiple API keys",
    "🛡️ Automatic Fallback - Tries next key if one fails or hits rate limit",
    "📊 Persistent Analytics - Vercel KV (Redis) for real-time stats that survive restarts",
    "🌍 Multi-Network - ARC, ETH, AVAX, MATIC, SOL, ARB, UNI, BASE, OP, APTOS testnets",
    "💵 Dual Token - USDC & EURC distribution via Circle APIs",
    "⏱️ Rate Limiting - 1 claim/wallet/network/24h (default mode), DoS protection",
    "📈 Live Dashboard - Success rates, key usage, network distribution, uptime tracking"
  ],
  
  // Technical details
  keyFeatures: {
    rotation: "Round-robin with automatic cycling",
    fallback: "Tries all keys before failing",
    analytics: "Vercel KV for true persistence",
    security: "Password-protected, API key hashing, rate limiting"
  },
  
  // Tech stack
  techStack: [
    "Node.js + Express",
    "Circle API",
    "Vercel Serverless Functions",
    "Vercel KV (Redis)",
    "Vanilla JS Frontend"
  ],
  
  // Network support
  networkInfo: {
    supported: "10+ testnets",
    tokens: "USDC, EURC",
    analytics: "/analytics.html endpoint"
  },
  
  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "internal"
  },
  
  keywords: ["circle", "usdc", "eurc", "faucet", "stablecoin", "web3", "infrastructure", "api", "redis", "vercel"]
}
