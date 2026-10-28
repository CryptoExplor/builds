/**
 * Multichain Hardhat Deployer — deterministic CREATE2 deployment guide
 * Facts sourced from https://github.com/CryptoExplor/multichain-hardhat-deployer README,
 * checked 2026-10-27. It is a guide + reference files rather than a deployed app,
 * so liveUrl points at the repository.
 */
module.exports = {
  name: "Multichain Hardhat Deployer",
  slug: "multichain-hardhat-deployer",
  description: "Deploy a contract with the same address across multiple EVM networks using Hardhat and hardhat-deploy deterministic CREATE2 deployments. Step-by-step guide plus ready-to-copy configuration, deploy scripts, verification tips, and a sample GitHub Actions workflow.",
  category: ["DevTools", "Web3", "Infrastructure"],
  tags: ["hardhat", "create2", "deterministic-deployment", "evm", "multi-chain", "smart-contracts", "github-actions", "guide"],
  status: "production",
  visibility: "public",
  // Documentation/reference repo — no separate web deployment.
  liveUrl: "https://github.com/CryptoExplor/multichain-hardhat-deployer",
  github: "https://github.com/CryptoExplor/multichain-hardhat-deployer",
  launched: "2025-08-24",

  featured: false,

  features: [
    "Same Address Everywhere - Deterministic CREATE2 deployments via hardhat-deploy",
    "Step-by-Step Docs - Prerequisites and keys, Hardhat project setup, deployment and verification",
    "Ready-to-Copy Files - Configuration and deploy scripts written for beginners",
    "Verification Tips - Etherscan and Blockscout contract verification",
    "Sample CI Workflow - GitHub Actions workflow for automated deploys"
  ],

  techStack: [
    "Hardhat",
    "hardhat-deploy",
    "Solidity",
    "GitHub Actions"
  ],

  docs: [
    "docs/01-prerequisites.md — environment and keys",
    "docs/02-setup.md — Hardhat project setup",
    "docs/03-deployment.md — deploy scripts and deterministic deploy"
  ],

  stats: {
    github_stars: 0
  },

  keywords: ["hardhat", "create2", "deterministic-deployment", "multichain", "evm", "deploy-scripts", "etherscan", "blockscout"]
}
