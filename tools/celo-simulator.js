module.exports = {
  name: "Celo Wallet Simulator",
  slug: "celo-simulator",
  description: "A lightweight wallet activity simulator for Celo blockchain featuring AES-256-GCM encrypted private keys, persona-driven behavior patterns, multi-RPC rotation with proxy support, and comprehensive CSV logging for infrastructure testing and research.",
  category: ["Testing", "Research", "Infrastructure"],
  tags: ["celo", "wallet", "simulator", "testing", "research", "rpc", "proxy", "encryption"],
  status: "production",
  visibility: "public",
  liveUrl: "https://github.com/CryptoExplor/Celo-Wallet-Simulator",
  github: "https://github.com/CryptoExplor/Celo-Wallet-Simulator",
  launched: "2025-11-19",
  
  // Features
  features: [
    "🔐 Encrypted Keys - AES-256-GCM in-memory encryption with master key rotation",
    "🎭 Persona-Driven - Configurable behavior patterns (idle, ping, active hours)",
    "🌐 Multi-RPC Rotation - Automatic failover across Celo RPC endpoints",
    "🔄 Proxy Support - HTTP(S) and SOCKS proxy with auto-refresh every 15 minutes",
    "⚡ Adaptive Patterns - Dynamic idleBias adjusting to success/failure rates",
    "📊 CSV Logging - Daily rotated logs with buffered flushes and 3-day retention",
    "🔁 Transaction Retry - Exponential backoff with persona-based retry logic",
    "🛡️ Resource Monitoring - Memory usage tracking and error handling"
  ],
  
  // Use cases
  useCases: [
    "RPC infrastructure testing and reliability monitoring",
    "Transaction throughput measurement",
    "Organic wallet behavior research",
    "Load testing for testnet infrastructure",
    "Developer tooling and analytics"
  ],
  
  // Security features
  security: {
    encryption: "AES-256-GCM with session salts",
    keyRotation: "Master key + backup keys support",
    storage: "In-memory only, no disk persistence",
    personas: "Optional encrypted storage"
  },
  
  // Tech stack
  techStack: [
    "Node.js",
    "Ethers.js",
    "AES-256-GCM Encryption",
    "CSV Logging",
    "Proxy Support (HTTP/SOCKS)",
    "Persona System"
  ],
  
  // Configuration
  personaFeatures: {
    behaviors: "idleBias, pingBias, retryBias, activeHours",
    amounts: "minAmount, maxAmount per transaction",
    timing: "avgWait, cooldownAfterFail",
    device: "User-Agent and latency simulation"
  },
  
  stats: {
    github_stars: 0,
    deployments: 0,
    security_audit: "internal"
  },
  
  keywords: ["celo", "wallet", "simulator", "testing", "research", "rpc", "encryption", "infrastructure"]
}
