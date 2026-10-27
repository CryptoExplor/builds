/**
 * Thru Wallet — developer website
 * Org: buildbyravi
 * The repo has no README and a null description, so this entry is sourced from the
 * repo's own code: src/app/layout.tsx metadata, src/content/site.ts, and the file
 * tree, checked 2026-10-27.
 */
module.exports = {
  name: "Thru Wallet Website",
  slug: "thru-wallet-web",
  description: "Developer website and canonical documentation home for the Thru Wallet extension — features, security principles, architecture diagram, changelog, install instructions, and the privacy policy. Also the site linked from the extension's Chrome Web Store listing.",
  category: ["Website", "Docs", "Web3"],
  tags: ["thru", "website", "docs", "nextjs", "typescript", "drizzle", "postgresql", "seo"],
  status: "beta",
  visibility: "public",
  liveUrl: "https://thruwallet.vercel.app",
  github: "https://github.com/buildbyravi/thru-wallet-web",
  launched: "2026-09-26",

  featured: false,

  features: [
    "📄 Canonical Policy Home - Hosts the privacy policy at /privacy; the repository link is no longer used for it",
    "🏗️ Architecture Diagram - Rendered ArchDiagram component explaining the extension's structure",
    "🔐 Security Principles - Published securityPrinciples content",
    "🧾 Changelog & Releases - Changelog entries plus release tracks and store status",
    "⚙️ Install Instructions - Clone, npm install, npm test, npm run build for the extension",
    "🤖 MCP Tables + llms.txt - Machine-readable tool tables and /llms.txt, /llms-full.txt for AI consumers",
    "🔎 SEO & Structured Data - SoftwareApplication JSON-LD, OpenGraph image, metadataBase pinned to the live domain",
    "🗄️ Notes Catalog - Drizzle ORM + Postgres-backed notes surfaced on the home route"
  ],

  techStack: [
    "Next.js (App Router, TypeScript)",
    "Drizzle ORM",
    "PostgreSQL (pg)",
    "Newsreader + JetBrains Mono variable fonts",
    "Vercel"
  ],

  routes: [
    "/ - home", "/agents", "/architecture", "/changelog", "/desk", "/docs",
    "/features", "/install", "/privacy", "/security", "/status", "/api"
  ],

  notes: [
    "The repo has no README; the description above is derived from the site's own code and content files.",
    "layout.tsx records: 'Verified 2026-10-04: thruwallet.vercel.app serves this site and is the developer website linked from the Chrome Web Store listing.'"
  ],

  stats: {
    github_stars: 0
  },

  keywords: ["thru", "thru-wallet", "website", "docs", "nextjs", "drizzle", "postgresql", "betanet"]
}
