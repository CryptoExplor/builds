module.exports = {
  name: "GitHub Contribution Bot",
  slug: "github-bot",
  description: "A browser-based, client-side app to simulate or automate GitHub activity via manual or scheduled commits with heatmap preview, multi-repo support, smart rotation, and AI-powered commit messages. Features PWA support, historic commit planning, and comprehensive usage analytics.",
  category: ["DevTools", "Automation", "Productivity"],
  tags: ["github", "automation", "bot", "commits", "ai", "gemini", "pwa", "analytics"],
  status: "production",
  visibility: "public",
  liveUrl: "https://githubbot-html.vercel.app",
  github: "https://github.com/CryptoExplor/GitHub-Contribution-Bot",
  launched: "2025-01-15",
  
  // Detailed features
  features: [
    "✅ Multi-Repo Support - Commit across multiple repositories with smart rotation",
    "🤖 AI Commit Messages - Gemini API for context-aware, human-like messages",
    "📊 Live Heatmap - Real-time GitHub contribution graph visualization",
    "📱 PWA Support - Install as standalone app, works offline",
    "⏰ Auto/Manual Commits - Scheduled automation or on-demand commits",
    "🔐 Client-Side Only - Token stored locally, never uploaded",
    "📈 Usage Analytics - Track activity, stats, and patterns",
    "🎯 Commit Preview - Review and edit commits before publishing"
  ],
  
  // Use cases
  useCases: [
    "Maintain GitHub contribution streaks effortlessly",
    "Simulate natural commit patterns for testing",
    "Automate repetitive commit tasks",
    "Visualize contribution patterns before committing",
    "Learn about CI/CD and automation workflows"
  ],
  
  // Tech stack
  techStack: [
    "Vanilla JavaScript",
    "GitHub API",
    "Gemini AI API",
    "Service Workers (PWA)",
    "LocalStorage",
    "Vercel"
  ],
  
  // Security & privacy
  security: {
    tokenStorage: "Browser localStorage only",
    noBackend: "100% client-side processing",
    noTracking: "No analytics or user data collection",
    transparency: "Commit preview before publishing"
  },
  
  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "none"
  },
  
  keywords: ["github", "automation", "bot", "commits", "ai", "productivity", "devtools", "pwa"]
}
