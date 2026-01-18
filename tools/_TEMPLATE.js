/**
 * Tool Schema Template
 * Copy this file when adding a new project
 * 
 * REQUIRED FIELDS:
 * - name: string (display name)
 * - slug: string (URL-safe, unique identifier)
 * - description: string (brief description, 1-2 sentences)
 * - category: string[] (non-empty array of categories)
 * - tags: string[] (non-empty array of tags)
 * - status: 'alpha' | 'beta' | 'production' | 'paused'
 * - visibility: 'public' | 'private'
 * - liveUrl: string (valid URL to live deployment)
 * - github: string (valid GitHub repository URL)
 * - launched: string (YYYY-MM-DD format)
 * 
 * OPTIONAL FIELDS:
 * - featured: boolean (show at top of homepage with star badge)
 * - farcaster: string (Farcaster frame/app URL - shows dedicated button)
 * - ogImage: string (custom Open Graph image URL)
 * - chains: string[] (supported blockchain networks)
 * - deployment: object (contract addresses and explorers)
 * - stats: object (GitHub stars, deployments, audits, etc.)
 * - keywords: string[] (additional SEO keywords)
 */

export default {
  // ============================================
  // REQUIRED FIELDS
  // ============================================
  
  // Display name shown on cards and detail pages
  name: "Project Name",
  
  // URL slug (must be unique, use kebab-case)
  slug: "project-name",
  
  // Brief, compelling description (1-2 sentences max)
  description: "A concise description of what this project does and why it matters. Focus on value, not features.",
  
  // Categories (at least one) - used for filtering and grouping
  category: ["Web3", "DeFi"],
  
  // Tags (at least one) - used for search and related tools
  // Use lowercase kebab-case for consistency
  tags: ["blockchain", "ethereum", "smart-contracts", "automation"],
  
  // Project status: alpha | beta | production | paused
  status: "production",
  
  // Visibility: public | private
  // Private tools won't appear in listings
  visibility: "public",
  
  // Live deployment URL (must be valid HTTPS URL)
  liveUrl: "https://your-project.vercel.app",
  
  // GitHub repository URL (must be valid GitHub URL)
  github: "https://github.com/username/repo",
  
  // Launch date in YYYY-MM-DD format (used for sorting)
  launched: "2025-01-17",
  
  // ============================================
  // OPTIONAL FIELDS
  // ============================================
  
  // Featured project - shows at top with star badge
  featured: false,
  
  // Farcaster frame/app URL (if deployed on Farcaster)
  // Shows dedicated "View on Farcaster" button with purple styling
  farcaster: "https://warpcast.com/~/composers?embeds[]=https://your-frame.vercel.app",
  
  // Custom Open Graph image for social sharing
  // If not provided, falls back to /og-image.png
  ogImage: "https://your-project.vercel.app/og.png",
  
  // ============================================
  // WEB3-SPECIFIC FIELDS (optional)
  // ============================================
  
  // Supported blockchain networks
  chains: ["ethereum", "base", "polygon", "arbitrum", "optimism"],
  
  // Contract deployment information
  deployment: {
    mainnet: {
      address: "0x1234567890123456789012345678901234567890",
      explorer: "https://etherscan.io/address/0x1234567890123456789012345678901234567890"
    },
    base: {
      address: "0x0987654321098765432109876543210987654321",
      explorer: "https://basescan.org/address/0x0987654321098765432109876543210987654321"
    }
  },
  
  // Project statistics and metadata
  stats: {
    github_stars: 42,              // Current GitHub stars
    deployments: 15,               // Number of deployments
    npm_package: "package-name",   // NPM package name (if published)
    gas_optimized: true,           // Whether gas optimizations are implemented
    security_audit: "passed"       // "passed" | "pending" | "none"
  },
  
  // Additional SEO keywords (beyond tags)
  keywords: ["defi", "web3", "automation", "yield-farming"]
}
