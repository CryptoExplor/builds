# Contributing to Builds

Thank you for your interest in contributing! This document provides guidelines for contributing to the Builds registry.

## 🎯 Ways to Contribute

- **Add your own projects** to the registry
- **Report bugs** or issues
- **Suggest features** or improvements
- **Improve documentation**
- **Fix bugs** or implement features

---

## 📋 Adding a New Project

### Step 1: Create a Tool File

Create a new file in `tools/` directory following this naming convention:
- Use kebab-case: `my-awesome-project.js`
- Match the slug you want in the URL

### Step 2: Tool Schema

Every tool file must export a default object with these required fields:

```js
export default {
  // REQUIRED FIELDS
  name: "Project Name",              // Display name
  slug: "project-slug",              // URL slug (must be unique)
  description: "Brief description",  // 1-2 sentences
  category: ["Category1"],           // Array of categories
  tags: ["tag1", "tag2"],           // Array of tags
  status: "production",              // alpha | beta | production | paused
  visibility: "public",              // public | private
  liveUrl: "https://...",           // Live deployment URL
  github: "https://github.com/...", // GitHub repository
  launched: "2025-01-17"            // YYYY-MM-DD format
}
```

### Step 3: Validation Checklist

Before submitting, ensure:

- [ ] All required fields are present
- [ ] `slug` is unique (check existing `tools/*.js` files)
- [ ] `launched` date is in `YYYY-MM-DD` format
- [ ] `status` is one of: `alpha`, `beta`, `production`, `paused`
- [ ] `visibility` is either `public` or `private`
- [ ] URLs are valid and accessible
- [ ] Tags use lowercase kebab-case

### Step 4: Submit

```bash
# Create a new branch
git checkout -b add-my-project

# Add your tool file
git add tools/my-project.js

# Commit with descriptive message
git commit -m "Add my-project to registry"

# Push to your fork
git push origin add-my-project

# Open a Pull Request on GitHub
```

---

## 🐛 Reporting Bugs

### Before Submitting

1. Check existing [issues](https://github.com/CryptoExplor/builds/issues)
2. Verify the bug exists in the latest version
3. Test in different browsers if UI-related

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome, Firefox]
- Version: [e.g., 22]
```

---

## 💡 Suggesting Features

We love feature suggestions! Please open an issue with:

- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other solutions you've considered
- **Additional context**: Screenshots, mockups, etc.

---

## 🔧 Development Guidelines

### Getting Started

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/builds.git
cd builds

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Code Style

- Use **2 spaces** for indentation
- Follow existing code patterns
- Keep components small and focused
- Add comments for complex logic

### Component Guidelines

- **Server Components** by default (App Router)
- Use **"use client"** only when necessary
- Keep client-side state minimal
- Prefer CSS for animations over JavaScript

### Git Commit Messages

Follow conventional commits:

```
feat: Add featured projects filter
fix: Resolve search input debouncing
docs: Update README deployment section
style: Format code with Prettier
refactor: Simplify tool loading logic
test: Add validation tests for loadTools
```

---

## 🧪 Testing

Before submitting a PR:

```bash
# Run linter
npm run lint

# Build successfully
npm run build

# Test locally
npm run start
```

---

## 📝 Pull Request Process

1. **Update documentation** if needed
2. **Test thoroughly** in development
3. **Update the README** if adding features
4. **Follow the PR template**
5. **Link related issues**

### PR Title Format

```
[Type] Brief description

Examples:
[Feature] Add GitHub stars integration
[Fix] Resolve duplicate slug validation
[Docs] Update contributing guidelines
```

### PR Checklist

- [ ] Code follows project style
- [ ] Tested locally
- [ ] Documentation updated
- [ ] No console errors
- [ ] Builds successfully

---

## 🚀 Release Process

Releases are automated:
1. Merge to `main` branch
2. Vercel auto-deploys
3. Changes live in ~30 seconds

---

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community

**Unacceptable behavior:**
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

---

## 📧 Questions?

- **GitHub Issues**: [Open an issue](https://github.com/CryptoExplor/builds/issues)
- **GitHub Discussions**: [Start a discussion](https://github.com/CryptoExplor/builds/discussions)
- **Farcaster**: [@dare1.eth](https://farcaster.xyz/dare1.eth)

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Builds! 🚀**
