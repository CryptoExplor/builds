module.exports = {
  name: "Solayer Devnet Faucet",
  slug: "solayer-faucet",
  description: "A lightweight browser-based auto faucet claimer for Solayer Devnet with configurable claim modes (indefinite, total limit, per-wallet limit), exponential retry backoff, live stats tracking, and activity logging. Fully client-side with no private keys required.",
  category: ["Faucet", "Automation", "Solana"],
  tags: ["solayer", "solana", "faucet", "automation", "devnet", "browser", "client-side"],
  status: "production",
  visibility: "public",
  liveUrl: "https://solayer-devnet.vercel.app",
  github: "https://github.com/CryptoExplor/Solayer-devnet-faucet",
  launched: "2025-08-24",
  
  // Features
  features: [
    "Auto-Claim Loop - Automated claiming with random 1-5s delays",
    "Flexible Modes - Indefinite, total limit, or per-wallet limit modes",
    "Live Stats - Real-time tracking of total, success, and error counts",
    "Smart Retry - Exponential backoff up to 5 retries with safe exit",
    "Activity Log - Detailed logging with Solayer Explorer transaction links",
    "Control Panel - Start/stop controls with safe exit mechanism",
    "Log Management - Clear log and reset stats in one click",
    "Client-Side Only - No private keys, only public addresses required"
  ],
  
  // Claim modes
  claimModes: {
    indefinite: "Runs forever until manually stopped",
    totalLimit: "Shared claim limit across all wallets",
    perWallet: "Individual claim limit per wallet address"
  },
  
  // Tech stack
  techStack: [
    "Vanilla JavaScript",
    "Solayer Devnet API",
    "HTML5",
    "CSS3",
    "LocalStorage"
  ],
  
  // Network info
  networkInfo: {
    network: "Solayer Devnet",
    rpcUrl: "https://devnet-rpc.solayer.org",
    explorer: "https://explorer.solayer.org"
  },
  
  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "none"
  },
  
  keywords: ["solayer", "solana", "faucet", "automation", "devnet", "browser", "client-side"]
}
