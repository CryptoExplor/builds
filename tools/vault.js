/**
 * Vault — local-encrypted note and password manager
 * Facts sourced from https://github.com/CryptoExplor/Vault README
 * and the repo's `homepage` field, checked 2026-10-27.
 */
module.exports = {
  name: "Vault",
  slug: "vault",
  description: "Secure web-based note and password manager that encrypts your data locally with a master password. Add, edit, tag, and import records, keep version history, and restore earlier versions — with no server storage at all.",
  category: ["Security", "Privacy", "Productivity"],
  tags: ["encryption", "password-manager", "notes", "local-first", "zero-knowledge", "privacy", "version-history"],
  status: "production",
  visibility: "public",
  liveUrl: "https://note-pass-vault.vercel.app",
  github: "https://github.com/CryptoExplor/Vault",
  launched: "2025-09-18",

  featured: false,

  features: [
    "Local Encryption - Notes and passwords are encrypted and stored locally in the browser, protected by a master password",
    "Notes & Passwords Management - Add, edit, and delete notes and password entries",
    "Tagging & Import - Organize data with tags and convenient import",
    "Version History - Track and restore previous versions of records",
    "No Server Storage - Zero knowledge; data never leaves the device",
    "No Install - Clone and open index.html in a browser, no server required"
  ],

  techStack: [
    "HTML / JavaScript",
    "Browser local storage",
    "No backend"
  ],

  security: {
    custody: "Zero-knowledge — all encryption and decryption happen in the browser",
    network: "No data transmitted or stored on a server",
    access: "Master password required to decrypt"
  },

  roadmap: [
    "Browser extension support",
    "Cloud backup integration (optional and encrypted)",
    "Enhanced search and filtering"
  ],

  stats: {
    github_stars: 0
  },

  keywords: ["vault", "password-manager", "notes", "local-encryption", "zero-knowledge", "privacy", "master-password"]
}
