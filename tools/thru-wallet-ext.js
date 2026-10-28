/**
 * Thru Wallet — Chrome MV3 self-custody wallet extension for the Thru native Layer 1
 * Org: buildbyravi (not CryptoExplor)
 * Facts sourced from https://github.com/buildbyravi/thru-wallet-ext README and from
 * src/content/site.ts in buildbyravi/thru-wallet-web, checked 2026-10-27.
 */
module.exports = {
  name: "Thru Wallet",
  slug: "thru-wallet-ext",
  description: "Unofficial, self-custody Chrome MV3 browser extension for the Thru native Layer 1 betanet — personal key management, transfers, and .thru name registration, built on the real @thru/sdk and @thru/programs packages. Community-built, not audited; betanet testnet funds only.",
  category: ["Wallet", "Web3", "Extension"],
  tags: ["thru", "wallet", "chrome-extension", "mv3", "self-custody", "betanet", "layer1", "esbuild", "sdk"],
  // The project's own site.ts declares status "ALPHA" and warns it is
  // "not production-ready and not security-reviewed".
  status: "alpha",
  visibility: "public",
  liveUrl: "https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok",
  github: "https://github.com/buildbyravi/thru-wallet-ext",
  launched: "2026-08-02",

  featured: false,

  chains: ["thru-betanet"],

  features: [
    "Chrome MV3 - Manifest V3 extension, single popup UI stack with no legacy fallback",
    "14 Popup Routes - Welcome, unlock, dashboard, accounts, account detail, add account, keyring, export, send, receive, faucet, history, settings, reset",
    "Session-Only Signing - Explicit default; optional per-sign password re-authentication, and changing that setting is password-gated",
    "Signing Guardrails - Value-moving methods use centralized auth:'signing', checked account/network context, and a network-mutation lock through submission",
    "Route Lifecycle Tests - test-route-lifecycle.mjs drives all 14 routes through the real Router, guards and bridge in no-vault / locked / unlocked states, asserting teardown, secret hygiene, modal focus trapping and Settings guarantees",
    "⌨Focus Trapping - Password dialogs trap keyboard focus: Tab wraps inside the dialog, Escape cancels, focus returns to the opener",
    "Custom Network Quarantine - Legacy saved networks stay listable and removable but can never be re-activated; a stale active selection self-heals to Betanet before RPC binding",
    "Side Panel Mode - Explicit Settings preference, persisted through the versioned backend preference service and re-applied after worker restart",
    "Contract v16 - 81 methods, with reset and auto-lock hardened in the background since v6",
    "Launchpad Quarantined - The legacy launchpad/DEX/prediction surface is deleted, not built into dist/, and a test keeps it out"
  ],

  techStack: [
    "Vanilla ES modules",
    "esbuild",
    "@thru/sdk (+ @thru/sdk/crypto subpath)",
    "@thru/programs",
    "Chrome Manifest V3"
  ],

  networkInfo: {
    name: "Thru Betanet",
    networkId: "betanet",
    rpcUrl: "https://rpc.betanet.thru.org",
    explorer: "https://scan.thru.org?network=betanet",
    note: "Betanet is Thru's final testnet before mainnet — a 10-node network with ~6-second blocks, replacing the single-node alphanet."
  },

  notes: [
    "Not affiliated with or endorsed by Unto Labs. Not audited.",
    "Do not use with real financial value — betanet testnet funds only.",
    "Thru is not EVM; Rabby/MetaMask/Phantom/Keplr are UX references only.",
    "Real-browser checks, live-network verification, security review, and an external audit remain required."
  ],

  links: {
    developerWebsite: "https://thruwallet.vercel.app",
    chromeWebStore: "https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok",
    release: "https://github.com/buildbyravi/thru-wallet-ext/releases/tag/v1.4.1",
    explorer: "https://scan.thru.org",
    statusDoc: "https://github.com/buildbyravi/thru-wallet-ext/blob/main/docs/STATUS_AND_ROADMAP.md"
  },

  stats: {
    github_stars: 0
  },

  keywords: ["thru", "thru-wallet", "chrome-extension", "mv3", "self-custody", "betanet", "layer1", "web3", "wallet"]
}
