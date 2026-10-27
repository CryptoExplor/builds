#!/usr/bin/env node
/**
 * Validates every file in tools/ against the registry schema and checks for
 * duplicate slugs. Scans the directory instead of hardcoding filenames, so a new
 * tool file is picked up automatically by CI.
 *
 * Kept in sync with the rules in lib/loadTools.js.
 *
 * Usage:
 *   node scripts/validate-tools.cjs            # validate + duplicate check
 *   node scripts/validate-tools.cjs --list     # also print the loaded registry
 */

const fs = require('fs')
const path = require('path')

const TOOLS_DIR = path.join(__dirname, '..', 'tools')

const REQUIRED = [
  'name',
  'slug',
  'description',
  'category',
  'tags',
  'status',
  'visibility',
  'liveUrl',
  'github',
  'launched',
]

const VALID_STATUSES = ['alpha', 'beta', 'production', 'paused']
const VALID_VISIBILITY = ['public', 'private']
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function isValidUrl(value) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function validate(tool, file, errors) {
  for (const field of REQUIRED) {
    if (!tool[field]) errors.push(`${file}: missing required field '${field}'`)
  }

  if (tool.status && !VALID_STATUSES.includes(tool.status)) {
    errors.push(`${file}: invalid status '${tool.status}' (expected ${VALID_STATUSES.join(' | ')})`)
  }

  if (tool.visibility && !VALID_VISIBILITY.includes(tool.visibility)) {
    errors.push(
      `${file}: invalid visibility '${tool.visibility}' (expected ${VALID_VISIBILITY.join(' | ')})`
    )
  }

  if (tool.category !== undefined && (!Array.isArray(tool.category) || tool.category.length === 0)) {
    errors.push(`${file}: category must be a non-empty array`)
  }

  if (tool.tags !== undefined && (!Array.isArray(tool.tags) || tool.tags.length === 0)) {
    errors.push(`${file}: tags must be a non-empty array`)
  }

  if (tool.launched !== undefined && !DATE_PATTERN.test(tool.launched)) {
    errors.push(`${file}: launched must be YYYY-MM-DD, got '${tool.launched}'`)
  }

  if (tool.liveUrl && !isValidUrl(tool.liveUrl)) {
    errors.push(`${file}: liveUrl is not a valid URL: ${tool.liveUrl}`)
  }

  if (tool.github && !isValidUrl(tool.github)) {
    errors.push(`${file}: github is not a valid URL: ${tool.github}`)
  }

  if (tool.farcaster && !isValidUrl(tool.farcaster)) {
    errors.push(`${file}: farcaster is not a valid URL: ${tool.farcaster}`)
  }
}

/**
 * Extract the set of tool files that are ACTIVELY registered in
 * lib/loadTools.js. Parses out comment lines first so the commented-out
 * `// 'my-new-tool.js': require(...)` example is not mistaken for a real
 * registration.
 *
 * @returns {{registered:Set<string>, dangling:string[]}}
 */
function readRegistrations() {
  const loaderPath = path.join(__dirname, '..', 'lib', 'loadTools.js')
  const source = fs
    .readFileSync(loaderPath, 'utf8')
    .split('\n')
    .filter(line => !line.trim().startsWith('//'))
    .join('\n')

  const registered = new Set()
  for (const match of source.matchAll(/require\(\s*['"]\.\.\/tools\/([\w.-]+\.js)['"]\s*\)/g)) {
    registered.add(match[1])
  }

  // Registrations pointing at a file that no longer exists.
  const dangling = [...registered].filter(f => !fs.existsSync(path.join(TOOLS_DIR, f)))

  return { registered, dangling }
}

function main() {
  const files = fs
    .readdirSync(TOOLS_DIR)
    .filter(f => f.endsWith('.js') && !f.startsWith('_'))
    .sort()

  const errors = []
  const slugs = new Map()
  const loaded = []

  // Registration check: a file in tools/ that is missing from the importAllTools()
  // map validates fine but never reaches the site.
  const { registered, dangling } = readRegistrations()
  for (const file of files) {
    if (!registered.has(file)) {
      errors.push(
        `${file}: present in tools/ but NOT registered in lib/loadTools.js importAllTools()`
      )
    }
  }
  for (const file of dangling) {
    errors.push(`${file}: registered in lib/loadTools.js but the file does not exist`)
  }

  for (const file of files) {
    let tool
    try {
      const mod = require(path.join(TOOLS_DIR, file))
      tool = mod.default || mod
    } catch (err) {
      errors.push(`${file}: failed to load — ${err.message}`)
      continue
    }

    validate(tool, file, errors)

    if (tool.slug) {
      if (slugs.has(tool.slug)) {
        errors.push(`${file}: duplicate slug '${tool.slug}' (also in ${slugs.get(tool.slug)})`)
      } else {
        slugs.set(tool.slug, file)
      }
    }

    loaded.push({
      slug: tool.slug,
      status: tool.status,
      visibility: tool.visibility,
      launched: tool.launched,
    })
  }

  if (process.argv.includes('--list')) {
    console.log(
      loaded
        .sort((a, b) => String(b.launched).localeCompare(String(a.launched)))
        .map(t => `  ${String(t.slug).padEnd(28)} ${String(t.status).padEnd(11)} ${String(t.visibility).padEnd(8)} ${t.launched}`)
        .join('\n')
    )
  }

  if (errors.length > 0) {
    console.error(`\n❌ ${errors.length} problem(s) across ${files.length} tool files:\n`)
    console.error(errors.map(e => `  - ${e}`).join('\n'))
    process.exit(1)
  }

  const publicCount = loaded.filter(t => t.visibility === 'public').length
  console.log(
    `✅ ${files.length} tool files valid · ${slugs.size} unique slugs · ${publicCount} public, ${
      loaded.length - publicCount
    } private`
  )
}

main()
