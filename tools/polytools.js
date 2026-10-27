/**
 * PolyTools — modular toolkit for the Polyester exchange
 * Facts sourced from https://github.com/CryptoExplor/polytools README
 * and the repo's `homepage` field (polytools-cc8.pages.dev), checked 2026-10-27.
 */
module.exports = {
  name: "PolyTools",
  slug: "polytools",
  description: "Community-built, read-only market and account research tools for Polyester — a non-custodial cross-chain spot exchange. Order book, depth heatmap, live tape with whale alerts, candle charts, bridge routes, calculators, and authenticated account analytics. Public market data runs on testnet today.",
  category: ["Web3", "DeFi", "DevTools"],
  tags: ["polyester", "market-data", "order-book", "mcp", "typescript", "react", "analytics", "testnet", "defi"],
  status: "beta",
  visibility: "public",
  liveUrl: "https://polytools-cc8.pages.dev",
  github: "https://github.com/CryptoExplor/polytools",
  launched: "2026-10-22",

  featured: false,

  // Web3 metadata
  chains: ["polyester-testnet"],

  features: [
    "📈 Markets - Overview, prices, 24-hour stats, sparklines, watchlist, and CSV export",
    "📊 Order Book - Public resting liquidity and depth, no account key required",
    "🌡️ Depth Heatmap - Order-book depth density and imbalance over time",
    "🐋 Trades - Live public tape with configurable whale alerts",
    "🕯️ Charts - Candle timeframes, volume, crosshair, and live refresh",
    "⚖️ Compare Prices - Polyester index versus CoinGecko, premium/discount in basis points",
    "🌉 Bridge Routes - Chains, fees, minimums, and route comparison",
    "🧮 Calculators - Position sizing, margin sketches, PnL/fee examples, conversion",
    "🔐 Account Overview - Authenticated balances, sampled balance/equity history, current fee rates",
    "🔑 API Setup - Passphrase-encrypted IndexedDB key vault with nonextractable local Ed25519 sessions",
    "🧾 Your Trades - Authenticated account executions and their actual execution fees",
    "📑 Orders - Authenticated open and completed orders with read-only order details",
    "💸 Money Movements - Authenticated transfers plus a credential-free public transaction lookup",
    "🧪 Profit & Loss - Experimental user-assisted FIFO or moving-weighted-average cost-basis estimates",
    "🧰 SDK - TypeScript, Python, and Rust snippets with order inputs validated against the selected pair"
  ],

  techStack: [
    "TypeScript",
    "Vite + React SPA",
    "@poly/core (zero-dependency core)",
    "MCP streamable-HTTP client",
    "Cloudflare Pages / Worker adapter",
    "Vercel Edge adapter",
    "Node adapter",
    "IndexedDB + Web Crypto (Ed25519)"
  ],

  architecture: {
    core: "packages/core — zero-dependency TypeScript core: config, MCP client, typed tool wrappers, price/depth/spread normalization, visibility-aware polling, encrypted account vault",
    backend: "backend — one pure Web-API handler (api(Request) → Response) with public GET routes, bounded TTL cache, and CORS",
    frontend: "apps/web — Vite + React SPA with reusable account analytics panels"
  },

  apiEndpoints: [
    "/api/health", "/api/env", "/api/markets", "/api/overview",
    "/api/orderbook", "/api/candles", "/api/trades", "/api/heatmap",
    "/api/zipper/config", "/api/zipper/routes", "/api/zipper/compare",
    "/api/flow", "/api/flow/by-tx", "/api/flow/explain"
  ],

  networkInfo: {
    name: "Polyester Testnet",
    explorer: "https://testnet.polyester.com",
    docs: "https://testnet.polyester.com/docs/developer-docs/getting-started",
    nativeToken: "n/a (spot exchange)"
  },

  notes: [
    "Not affiliated with Polyester / Fabric Labs. Not financial advice. Testnet data may reset.",
    "Private account analytics currently supports Polyester Testnet only.",
    "Public mainnet support can be configured when an official endpoint is announced.",
    "The backend facade speaks MCP server-side and re-exposes CORS-open GET JSON. It is not a private-account proxy and must not receive account private keys."
  ],

  stats: {
    github_stars: 0,
    deployments: 1,
    gas_optimized: false,
    security_audit: "none"
  },

  keywords: ["polyester", "polytools", "order-book", "market-data", "dex", "cross-chain", "mcp", "typescript", "defi"]
}
