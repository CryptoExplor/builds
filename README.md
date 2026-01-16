# Builds by CryptoExplor

> A registry of everything I ship — tools, apps, experiments.

---

## 📁 Project Structure

```
builds/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── globals.css
│   └── tools/
│       └── [slug]/
│           └── page.jsx
├── components/
│   ├── Navbar.jsx
│   ├── ToolCard.jsx
│   ├── StatusBadge.jsx
│   ├── ToolGrid.jsx
│   └── Footer.jsx
├── lib/
│   └── loadTools.js
├── tools/
│   ├── tempo-wallet.js
│   ├── tempo.js
│   └── flush-rewarder.js
├── public/
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠️ Adding New Tools

To add a new tool to the registry:

1. Create a new JavaScript file in the `tools/` directory (e.g., `my-tool.js`)
2. Export a default object with the tool's information:

```javascript
export default {
  serial: 6, // Increment the serial number
  name: "My Tool",
  slug: "my-tool",
  description: "Description of my tool",
  category: ["Category1", "Category2"],
  tags: ["tag1", "tag2", "tag3"],
  status: "production", // production, beta, alpha, paused
  visibility: "public",
  liveUrl: "https://my-tool.example.com",
  github: "https://github.com/username/my-tool",
  launched: "2024-01-01" // YYYY-MM-DD format
}
```

3. The tool will automatically appear on the site after restarting the development server.

---

## 📦 Dependencies

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons

---

## 🌐 Deployment

This project is ready for deployment on Vercel or any other platform that supports Next.js applications.