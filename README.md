# Builds by CryptoExplor

> A registry of everything I ship — tools, apps, experiments.

**Live:** [cryptoexplor.vercel.app](https://cryptoexplor.vercel.app)

---

## ✨ Features

- 🔄 **Auto-sync** — Add a `.js` file, push, and it's live
- 🔍 **Search** — Find projects by name, tags, or description
- 🏷️ **Status filters** — Filter by production, beta, alpha, or paused
- 📊 **Auto serials** — Projects numbered automatically by launch date
- 🎨 **Dark theme** — Clean, modern UI inspired by Web3 aesthetics
- ⚡ **Fast deploys** — Vercel auto-builds on every push

---

## 🚀 Quick Start

```bash
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
│   ├── layout.jsx          # Root layout
│   ├── page.jsx            # Home page (server)
│   ├── globals.css         # Global styles
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation
│   │   ├── ToolCard.jsx    # Tool cards
│   │   ├── ToolGrid.jsx    # Grid with filters (client)
│   │   ├── StatusBadge.jsx # Status badges
│   │   └── Footer.jsx      # Footer
│   └── tools/
│       └── [slug]/
│           └── page.jsx    # Tool detail pages
├── lib/
│   └── loadTools.js        # Tool loader
├── tools/                  # 🔥 ADD YOUR PROJECTS HERE
│   ├── farmlabs.js
│   └── tempo.js
└── ...
```

---

## 🌐 Deployment

This site is deployed on **Vercel** at [cryptoexplor.vercel.app](https://cryptoexplor.vercel.app)

### Deploy Your Own:
1. Push to GitHub
2. Import repo on [Vercel](https://vercel.com)
3. Framework: **Next.js** (auto-detected)
4. Deploy!

Every push auto-deploys.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Hosting | Vercel |
| Data Source | Git (tools/*.js) |

---

## 🎨 Design Philosophy

- **Git = Source of Truth** — No database needed
- **Auto-everything** — Serial numbers, routing, metadata
- **Zero manual UI edits** — Just drop files
- **Fast shipping** — From idea to live in minutes

---

## 📝 Example Projects

Current projects on the live site:

- **FarmLabs** — Web3 automation suite for EVM testnet testing
- **Tempo Tools** — Developer utilities for the Tempo ecosystem

---

## 🔮 Roadmap

- [ ] GitHub API integration (stars, last commit)
- [ ] Tag/category filters
- [ ] Featured projects flag
- [ ] Custom domain support
- [ ] Project screenshots/thumbnails
- [ ] RSS feed for new projects

---

## 🤝 Contributing

Issues and PRs welcome! This is a living project registry.

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 💬 Contact

- GitHub: [@CryptoExplor](https://github.com/CryptoExplor)
- Live Site: [cryptoexplor.vercel.app](https://cryptoexplor.vercel.app)

---

**Built with ❤️ using Next.js and Vercel**
