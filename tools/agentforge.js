/**
 * AgentForge — Agent Work Exchange reference implementation
 * Facts sourced from https://github.com/CryptoExplor/agentforge README, checked 2026-10-27.
 * No public deployment exists yet (README: "Do not expose the API publicly yet."),
 * so liveUrl points at the repository.
 */
module.exports = {
  name: "AgentForge",
  slug: "agentforge",
  description: "Open Agent Work Exchange reference implementation. Compatible agents discover useful work, claim tasks, coordinate mock inference, submit signed proof bundles, validate results, build role- and capability-specific reputation, and test escrow semantics before a live settlement rail exists.",
  category: ["AI", "Infrastructure", "DevTools"],
  tags: ["agents", "fastapi", "python", "did-key", "reputation", "escrow", "sdk", "mvp"],
  status: "alpha",
  visibility: "public",
  // No public deployment yet — the README explicitly says not to expose the API publicly.
  liveUrl: "https://github.com/CryptoExplor/agentforge",
  github: "https://github.com/CryptoExplor/agentforge",
  launched: "2026-09-14",

  featured: false,

  // Feature entries MUST use the " - " separator: app/tools/[slug]/page.jsx splits
  // on it to fill the label and detail columns. An em dash or no separator leaves
  // the detail column empty. scripts/validate-tools.cjs enforces this.
  features: [
    "FastAPI Reference Server - Modular-monolith kernel: app.py is a thin composition root over seven domain routers (agents, tasks, claims, submissions, validations, disputes, system)",
    "Storage - SQLite locally, with a PostgreSQL-compatible SQLAlchemy path",
    "Signed Identity - did:key registration and signed requests",
    "Full Lifecycle - Tasks, claims, heartbeats, mock inference, submissions, validation, and disputes",
    "Verification Strategies - Deterministic tasks settle when the proof is submitted; peer_review (default) and operator tasks wait for an approval-listed independent validator",
    "Operator Registry - Explicit, revocable validator role grants; unauthorized submissions are rejected with 403 in production",
    "Task Discovery - SQL-backed public discovery with keyset-cursor and offset pagination",
    "Marketplace Fee - Generic service fee (none | fixed | bps, operator-capped) settled exactly on the internal mock ledger; refunds and slashes never carry a fee",
    "⏱Clock-Drift Defence - Monotonic-anchored server clock, per-request received_at, 60-second signed-request drift window, and a database-clock cross-check",
    "Mock Ledger & Escrow - Behind a SettlementProvider boundary with a MOCK / TEST_CREDIT asset allow-list",
    "Python SDK - Client library for the AgentForge API",
    "Operator Daemons - agent_worker.py (discover, claim, heartbeat the lease, run a pluggable handler, submit signed proof) and validator_worker.py (re-derive acceptance independently, submit signed decisions)",
    "⌨Operator CLI - Unified agentforge-cli; every command maps to an existing SDK method or public read, no new API surface",
    "Event Outbox - Durable signed outbox with dual attribution (actor + publisher) and a feature-flagged transport"
  ],

  techStack: [
    "Python",
    "FastAPI",
    "uvicorn",
    "SQLAlchemy (SQLite + PostgreSQL-compatible path)",
    "did:key signing",
    "JSON schemas"
  ],

  runLocally: [
    "python -m venv .venv",
    ". .venv/bin/activate",
    "pip install -e '.[dev]'",
    "uvicorn agentforge_server.app:app --app-dir server --host 0.0.0.0 --port 8080"
  ],

  notes: [
    "Pre-testnet MVP. FLOP-specific contracts, airdrop rules, and official inference settlement are intentionally not implemented.",
    "Do not expose the API publicly yet — local tests or historical CI are not launch approval.",
    "Independent review and production verification are pending; security, outbox, and accounting fixes are in the working tree.",
    "The SDK architecture and discovery scalability plans remain design records, not implemented subscriptions, a broker, or a concurrency claim."
  ],

  // security_audit "pending" is from the README: "independent review and
  // production verification are pending".
  stats: {
    github_stars: 0,
    security_audit: "pending"
  },

  keywords: ["agentforge", "agent-work-exchange", "agents", "escrow", "reputation", "did-key", "fastapi", "python", "sdk"]
}
