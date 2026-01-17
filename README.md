# Builds by CryptoExplor

> A registry of everything I ship — tools, apps, experiments.

---

## 🚀 Getting Started

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
  launched: "2025-01-16" // YYYY-MM-DD
}
```

**Serial numbers are auto-generated** — don't add them manually!

Push and Vercel auto-deploys. Done.

---

## 🏗️ Project Structure

```
builds/
├── app/
│   ├── layout.jsx          # Root layout
│   ├── page.jsx            # Home page (server)
│   ├── globals.css         # Global styles
│   └── tools/
│       └── [slug]/
│           └── page.jsx    # Tool detail pages
├── components/
│   ├── Navbar.jsx          # Navigation
│   ├── ToolCard.jsx        # Tool cards
│   ├── ToolGrid.jsx        # Grid with filters (client)
│   ├── StatusBadge.jsx     # Status badges
│   └── Footer.jsx          # Footer
├── lib/
│   └── loadTools.js        # Tool loader
├── tools/
│   ├── farm-labs.js
│   └── tempo.js
└── ...
```

---

## 🌐 Deployment

Deploy to Vercel:
1. Push to GitHub
2. Import repo on Vercel
3. Deploy

Recommended URL: `dev.cryptoexplor.vercel.app`

---

## 📦 Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Lucide Icons
- Vercel (hosting)

---

## License

MIT