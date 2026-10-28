/**
 * Wallet Forge — client-side wallet data preparation
 * Facts sourced from https://github.com/CryptoExplor/Wallet-Forge README (v2.1.0)
 * and the repo's `homepage` field, checked 2026-10-27.
 */
module.exports = {
  name: "Wallet Forge",
  slug: "wallet-forge",
  description: "100% client-side wallet data preparation tool with enterprise-grade validation — import, clean, and export private keys and addresses. EIP-55 checksums, real BIP-39 checksum verification, and multi-chain address detection, with zero backend and zero network requests.",
  category: ["Security", "DevTools", "Web3"],
  tags: ["wallet", "private-keys", "eip-55", "bip-39", "client-side", "offline", "ethereum", "bitcoin", "solana", "tron"],
  status: "production",
  visibility: "public",
  liveUrl: "https://wallet-forge.vercel.app",
  github: "https://github.com/CryptoExplor/Wallet-Forge",
  launched: "2026-01-16",

  featured: true,

  features: [
    "100% Client-Side - Zero backend, zero network requests",
    "No External Dependencies - All code runs locally",
    "No Data Storage - Nothing saved to disk or cloud",
    "Offline Ready - Works without an internet connection",
    "Open Source - Fully auditable single HTML file",
    "Burn Session - Nuclear option to clear all data",
    "EIP-55 Checksum - Proper Ethereum address validation",
    "Private Key Format - 64-char hex with optional 0x prefix",
    "Real-Time Errors - Shows exact line numbers of invalid entries",
    "Count Mismatch Detection - Warns when private keys and addresses do not match",
    "Zero-Key Detection - Prevents all-zero private keys",
    "BIP-39 Mnemonic Validation - Checks every word against the real 2048-word list and verifies the cryptographic checksum bits via the browser's Web Crypto SHA-256",
    "Multi-Chain Address Detection - Ethereum (0x), Bitcoin (legacy 1.../3... and bech32 bc1...), Tron (T...), and Solana, with a per-chain breakdown",
    "Mnemonic Field - Optional dedicated field for 12/15/18/21/24-word seed phrases, kept separate from keys and addresses",
    "Extra Column - Optional free-text column for tags, labels, or amounts",
    "Custom Column Headers - Rename output columns to match a downstream tool"
  ],

  techStack: [
    "Single-file HTML / JavaScript",
    "Web Crypto API (SHA-256)",
    "CSP protected",
    "No backend"
  ],

  security: {
    custody: "Non-custodial — nothing leaves the browser",
    network: "Zero network requests, offline capable",
    tracking: "None",
    auditability: "Single open-source HTML file"
  },

  // version + license are from the README badges; stars from the GitHub API.
  stats: {
    github_stars: 0,
    version: "2.1.0",
    license: "MIT"
  },

  keywords: ["wallet-forge", "private-keys", "eip-55", "bip-39", "seed-phrase", "client-side", "offline", "crypto-tools"]
}
