# Builds by CryptoExplor

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

> A living registry of everything I ship — Web3 tools, blockchain apps, and DeFi experiments.

**Live:** [cryptoexplor.vercel.app](https://cryptoexplor.vercel.app)

---

## ✨ Features

- 🔄 **Auto-sync** — Add a `.js` file, push, and it's live in 30 seconds
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
export default {
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

Then push:

```bash
git add tools/my-project.js
git commit -m "Add my-project"
git push
```

Vercel auto-deploys in ~30 seconds. Done! ✅

---

## 🏗️ Project Structure

```
builds/
├── app/
│   ├── layout.jsx          # Root layout + metadata
│   ├── page.jsx            # Home page (server-rendered)
│   ├── globals.css         # Global styles + Tailwind
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── ToolCard.jsx    # Project cards
│   │   ├── ToolGrid.jsx    # Grid with filters (client)
│   │   ├── StatusBadge.jsx # Status indicators
│   │   └── Footer.jsx      # Footer with links
│   └── tools/
│       └── [slug]/
│           └── page.jsx    # Dynamic project pages
├── lib/
│   └── loadTools.js        # Core: Git-based data loader
├── tools/                  # 🔥 ADD YOUR PROJECTS HERE
│   ├── farmlabs.js
│   └── tempo.js
├── .github/                # Templates & workflows
└── public/                 # Static assets
```

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
| Icons | Lucide React |
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

Live projects on the registry:

- **[FarmLabs](https://farmlabs.pages.dev)** — Web3 automation suite for EVM testnet testing & wallet simulation
- **[Tempo Tools](https://tempo.xyz)** — Developer utilities for the Tempo blockchain ecosystem

---

## 🔮 Roadmap

- [x] Core registry functionality
- [x] Search and filters
- [x] Auto-generated routing
- [ ] GitHub API integration (stars, last commit)
- [ ] Featured projects flag
- [ ] Project screenshots/thumbnails
- [ ] Tag-based related projects
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
