# Builds by CryptoExplor

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

> A living registry of everything I ship — Web3 tools, blockchain apps, and DeFi experiments.

**Live:** [cryptoexplor.vercel.app](https://cryptoexplor.vercel.app)

---

## ✨ Features

- 🔄 **Git-backed** — Add a `.js` file, register it, push, and it's live in 30 seconds
- 🔍 **Smart Search** — Find projects by name, tags, or description
- 🏷️ **Status Filters** — Filter by production, beta, alpha, or paused
- 📊 **Auto Serials** — Projects numbered automatically by launch date
- 🎨 **Dark Theme** — Clean, modern UI inspired by Web3 aesthetics
- ⚡ **Edge Optimized** — Static generation for instant page loads
- 🌐 **Web3 Native** — Built for blockchain developers and researchers

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/CryptoExplor/builds.git
cd builds

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## ✨ Adding New Projects

Create a file in `tools/` (e.g., `my-project.js`):

```js
// IMPORTANT: use CommonJS (module.exports), not `export default`.
// lib/loadTools.js requires these files at build time for static generation.
module.exports = {
  name: "My Project",
  slug: "my-project", // Used in URL
  description: "What this project does",
  category: ["Category1", "Category2"],
  tags: ["tag1", "tag2", "tag3"],
  status: "production", // alpha | beta | production | paused
  visibility: "public", // public | private
  liveUrl: "https://my-project.vercel.app",
  github: "https://github.com/CryptoExplor/my-project",
  launched: "2025-01-17" // YYYY-MM-DD
}
```

**Serial numbers are auto-generated** — don't add them manually!

Then register the file in the `importAllTools()` map in `lib/loadTools.js`:

```js
'my-project.js': require('../tools/my-project.js'),
```

> Skipping that step is the one way to add a file and see nothing happen — the
> file validates fine but never reaches the site. CI's `registry-sync` job fails
> the build if a file in `tools/` is missing from that map.

Validate before you push:

```bash
npm run validate   # schema + duplicate slugs + registration check
```

Then push:

```bash
git add tools/my-project.js lib/loadTools.js
git commit -m "Add my-project"
git push
```

Vercel auto-deploys in ~30 seconds. Done! ✅

---

## 🏗️ Project Structure

```
builds/
├── app/
│   ├── layout.jsx             # Root layout + metadata (metadataBase, OG, Twitter)
│   ├── page.jsx               # Home page (server-rendered)
│   ├── not-found.jsx          # Themed 404
│   ├── globals.css            # Global styles + Tailwind
│   ├── components/
│   │   ├── icons/             # Every icon on the site, hand drawn SVG
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── ProfileHero.jsx    # Animated hero (GSAP) + profile stats
│   │   ├── ProfileSections.jsx# Focus areas, Farcaster mini apps, signals
│   │   ├── Reveal.jsx         # GSAP ScrollTrigger reveal wrapper
│   │   ├── ToolCard.jsx       # Project cards
│   │   ├── ToolGrid.jsx       # Grid with filters + scroll reveals (client)
│   │   ├── StatusBadge.jsx    # Status indicators
│   │   └── Footer.jsx         # Footer with profile links
│   └── tools/
│       └── [slug]/
│           └── page.jsx       # Dynamic project pages (dynamicParams = false)
├── lib/
│   ├── loadTools.js           # Core: Git-based data loader + validation
│   ├── profile.js             # Profile & org data (synced from GitHub profile README)
│   └── statusStyles.js        # Centralized status badge styles
├── scripts/
│   └── validate-tools.cjs     # Scans tools/ — schema + duplicate slugs
├── tools/                     # 🔥 ADD YOUR PROJECTS HERE (24 files)
│   ├── _TEMPLATE.js           # Schema reference (skipped by the loader)
│   ├── farmlabs.js
│   └── ...
├── .github/                   # Templates & workflows
└── public/                    # Static assets
```

### 🎨 Icons

Every icon on the site lives in `app/components/icons/` and is a hand drawn SVG.
There is no icon package: `lucide-react` and `@phosphor-icons/react` were removed.

```js
import { Github, ArrowLeft, Star } from '@/app/components/icons'
```

- `icon-data.mjs` holds the geometry. One grid, one weight: 24×24, 1.5px strokes,
  round caps and joins, nothing within 2px of an edge. Brand and glyph marks
  (github, x, zap, boxes, star) are filled; everything else is stroked.
- `index.jsx` is the only import surface. Props are `size`, `className`,
  `strokeWidth` and `title`. No title means the icon is decorative and hidden
  from screen readers; pass one and it becomes a labelled image.
- Colour is always `currentColor`, so an icon matches the text around it.

Adding an icon means adding one entry to `icon-data.mjs` and one export in
`index.jsx`. Then run `npm run icons` to regenerate the contact sheet at
`docs/icon-sheet.html` and check it in a browser. `npm test` validates the
geometry and writes nothing.

**No emoji in the product.** Not in the UI, not in `tools/*.js`, not in a
heading the app renders. An emoji depends on whatever font the reader's platform
ships, so it changes shape, weight, colour and size on every device.
`scripts/check-no-emoji.mjs` scans `app/`, `lib/` and `tools/` and fails CI if one
comes back.

That scope is deliberate: the rule is about what ships to a reader, so this
README and `docs/` keep their decorative headings and the check does not read
them. Arrows, em dashes and `™` are typography rather than emoji, and stay
allowed everywhere.

### 🧑‍💻 Profile data

`lib/profile.js` holds the profile and org content shown on the homepage and footer —
name, tagline, focus areas, the six Farcaster mini apps, and social links. It is sourced
from the [CryptoExplor profile README](https://github.com/CryptoExplor/CryptoExplor) and
the GitHub user API. When that README changes, update this one file.

---

## 🌐 Deployment

This site is deployed on **Vercel** at [cryptoexplor.vercel.app](https://cryptoexplor.vercel.app)

### Deploy Your Own:
1. Fork this repository
2. Import on [Vercel](https://vercel.com)
3. Framework preset: **Next.js** (auto-detected)
4. Deploy!

Every push to `main` triggers auto-deployment.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Icons | Hand-drawn SVG (`app/components/icons`) |
| Hosting | Vercel (Edge Network) |
| Data Source | Git (tools/*.js files) |
| Language | JavaScript |

---

## 🎨 Design Philosophy

- **Git = Database** — No CMS, no API, just version-controlled files
- **Zero Config** — Drop a file, get a page automatically
- **Static First** — Build-time generation for maximum speed
- **Developer UX** — Optimized for shipping fast

---

## 📝 Current Projects

The registry holds **23 public projects** (24 tool files; 1 currently private), drawn from two GitHub accounts: [CryptoExplor](https://github.com/CryptoExplor) and the [buildbyravi](https://github.com/buildbyravi) org. Run `npm run validate` to print the live list.

Featured / flagship:

- **[VOIDMASKS](https://voidmasks.vercel.app)** — 10,000-supply permissionless NFT collection on Stacks, 100% on-chain SVG
- **[FarSend](https://farsend.vercel.app)** — Multi-chain batch sender for ETH and ERC-20 tokens
- **[FarmLabs](https://farmlabs.pages.dev)** — Web3 automation suite for EVM testnet testing & wallet simulation
- **[PolyTools](https://polytools-cc8.pages.dev)** — Read-only market and account research tools for Polyester
- **[Wallet Forge](https://wallet-forge.vercel.app)** — 100% client-side wallet key import, validation, and export
- **[Circle Faucet](https://circle-faucet-alpha.vercel.app)** — Automated claimer for Circle testnet tokens

Newest additions: [AgentForge](https://github.com/CryptoExplor/agentforge), [TeQoin Faucet](https://t.me/teqoinfaucetbot/faucet), [Base Mint](https://base-mintapp.vercel.app), [OmniTap](https://omnitap.vercel.app), [Vault](https://note-pass-vault.vercel.app), [Multichain Hardhat Deployer](https://github.com/CryptoExplor/multichain-hardhat-deployer).

> Entries are hidden, not deleted, when their source repo disappears. `tools/tempo.js` is set to `visibility: "private"` because `CryptoExplor/tempo` now returns HTTP 403. Flip it back to `"public"` if the repo returns.

---

## 🔮 Roadmap

- [x] Core registry functionality
- [x] Search and filters
- [x] Auto-generated routing
- [x] Featured projects flag (`featured: true` pins a project to the top with a star badge)
- [x] Tag-based related projects (detail pages score related tools by shared tags + categories)
- [x] Profile & org section on the homepage (synced from the GitHub profile README via `lib/profile.js`)
- [x] CI schema validation that scans `tools/` instead of hardcoding filenames
- [ ] GitHub API integration (stars, last commit)
- [ ] Project screenshots/thumbnails
- [ ] RSS feed for new projects
- [ ] Analytics dashboard

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

This means you can use, modify, and distribute this code freely.

---

## 💬 Connect

<div align="center">

**Tip:** `0x4f6Fb0A6c8A4C667bdF73C0257BE162B144c1624`

Made with 🔥 by **CryptoExplor**

*Trust through transparency*

[![Farcaster](https://img.shields.io/badge/Farcaster-dare1.eth-8A63D2)](https://farcaster.xyz/dare1.eth)
[![GitHub](https://img.shields.io/badge/GitHub-CryptoExplor-black)](https://github.com/CryptoExplor)

</div>

---

**Built with Next.js • Deployed on Vercel**
