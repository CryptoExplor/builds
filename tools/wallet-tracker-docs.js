/**
 * Wallet Balance Tracker — docs & marketing site
 * Org: buildbyravi. NOTE: CryptoExplor/wallet-tracker-docs is a FORK of this repo
 * (confirmed via the GitHub API: fork=true, parent=buildbyravi/wallet-tracker-docs),
 * so this entry points at the upstream original.
 * Facts sourced from the repo README, checked 2026-10-27.
 */
module.exports = {
  name: "Wallet Balance Tracker Docs",
  slug: "wallet-tracker-docs",
  description: "Documentation and marketing site for the Wallet Balance Tracker Google Sheets™ add-on — a free Apps Script library that fetches live native coin balances across Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche, and any EVM chain with no API key required.",
  category: ["Docs", "DeFi", "Tooling"],
  tags: ["google-sheets", "apps-script", "docs", "wallet-tracker", "evm", "balances", "vite", "multi-chain"],
  status: "production",
  visibility: "public",
  liveUrl: "https://wallet-tracker-docs.vercel.app",
  github: "https://github.com/buildbyravi/wallet-tracker-docs",
  launched: "2026-06-08",

  featured: false,

  chains: ["ethereum", "polygon", "bsc", "arbitrum", "optimism", "avalanche"],

  features: [
    "📊 Live Native Balances - Fetches native coin balances across Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche, and any EVM chain",
    "🔑 No API Key - Works without any API key",
    "📄 Four Pages - Home, Privacy Policy, Terms of Service, and Support",
    "📋 Copy-Paste Wrapper - Support page ships an 18-line Code.gs wrapper block: thin one-line delegators with zero logic, meant to be pasted into a user's own bound project",
    "⚡ Static & Fast - Vite + vanilla HTML/CSS deployed on Vercel"
  ],

  techStack: [
    "Vite",
    "Vanilla HTML/CSS",
    "Google Apps Script (wrapper block only)",
    "Vercel"
  ],

  pages: [
    "/ - Home",
    "/privacy.html - Privacy Policy",
    "/terms.html - Terms of Service",
    "/support.html - Support"
  ],

  notes: [
    "This repo is the static docs/marketing site only.",
    "It deliberately does not contain the actual WalletTracker Apps Script library implementation (batch engine, RPC client, dashboard/portfolio logic) — that lives in a separate, private Apps Script library project.",
    "CryptoExplor/wallet-tracker-docs is a fork of this repo; this entry points at the upstream original."
  ],

  stats: {
    github_stars: 1
  },

  keywords: ["wallet-tracker", "google-sheets", "apps-script", "evm", "balances", "ethereum", "polygon", "docs"]
}
