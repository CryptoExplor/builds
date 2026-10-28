/**
 * TeQoin Faucet — Telegram Mini App
 * Facts sourced from https://github.com/CryptoExplor/TeQoin-Faucet README
 * and the repo's `homepage` field (https://t.me/teqoinfaucetbot/faucet), checked 2026-10-27.
 */
module.exports = {
  name: "TeQoin Faucet",
  slug: "teqoin-faucet",
  description: "Unofficial Telegram Mini App faucet client for the TeQoin L2 testnet. Claims native ETH plus USDT, USDC, or DAI through a same-origin serverless proxy, because TeQoin's API only sends CORS headers for its own origin.",
  category: ["Faucet", "Telegram", "Testnet"],
  tags: ["teqoin", "faucet", "telegram", "miniapp", "testnet", "l2", "vercel", "cors-proxy"],
  status: "beta",
  visibility: "public",
  liveUrl: "https://t.me/teqoinfaucetbot/faucet",
  github: "https://github.com/CryptoExplor/TeQoin-Faucet",
  launched: "2026-07-13",

  featured: false,

  chains: ["teqoin-l2-testnet"],

  features: [
    "Native ETH - L2 gas token claims",
    "USDT - 25 tokens per claim",
    "USDC - 25 tokens per claim",
    "DAI - 25 tokens per claim",
    "Telegram Mini App - a mini app, not a bot",
    "Same-origin proxy - the frontend POSTs { wallet, nativeOnly } to POST /api/claim, a Vercel serverless function that forwards to TeQoin server-to-server, so no CORS preflight is involved",
    "Verbatim pass-through - TeQoin's status and body are returned unchanged, so cooldowns and rate-limit errors surface exactly as the official API returns them",
    "Claim ledger - keeps TeQoin's one-address-per-day, per-device-and-IP limits fair"
  ],

  techStack: [
    "JavaScript",
    "Vite",
    "Vercel Serverless Functions",
    "Telegram Mini App SDK"
  ],

  networkInfo: {
    name: "TeQoin L2 Testnet",
    upstream: "https://api2.teqoin.io/api/v1/Faucet/Claim",
    site: "https://teqoin.io"
  },

  notes: [
    "Unofficial client — not affiliated with TeQoin.",
    "Testnet tokens only."
  ],

  stats: {
    github_stars: 0
  },

  keywords: ["teqoin", "faucet", "telegram-mini-app", "l2", "testnet", "usdt", "usdc", "dai", "cors-proxy"]
}
