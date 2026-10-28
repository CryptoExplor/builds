#!/usr/bin/env node
/**
 * Fails if an emoji appears in the shipped UI or in the tool registry data.
 *
 *   node scripts/check-no-emoji.mjs
 *
 * The rule: the site draws its own icons from app/components/icons and does not
 * depend on the system emoji font, which renders differently on every platform
 * and cannot take the site's colour, weight or size. Terminal output in
 * scripts/ is out of scope, since it never reaches a browser.
 *
 * Walks the tree with readdirSync rather than fs.glob, which only exists from
 * Node 22 and would break CI, where the workflow pins Node 18.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

// Directories that hold shipped UI or registry data. Scripts are excluded on
// purpose: their output goes to a terminal, not to a browser.
const TARGETS = ['app', 'lib', 'tools']
const EXTENSIONS = ['.js', '.jsx', '.mjs']
const SKIP_DIRS = new Set(['node_modules', '.next', '.next-build', '.git', 'dist', 'build'])

const EMOJI = new RegExp(
  '[' +
    '\\u{1F000}-\\u{1FAFF}' + // pictographs, emoji panels, flags
    '\\u{2600}-\\u{27BF}' + // misc symbols and dingbats
    '\\u{2B00}-\\u{2BFF}' + // arrows and geometric shapes used as emoji
    '\\u{2190}-\\u{21FF}' + // arrows
    '\\u2139\\u2049\\u2122' +
    '\\uFE0F\\uFE0E\\u200D' + // variation selectors and zero width joiner
    ']',
  'u'
)

/** Every file under the target roots whose extension is one we scan. */
function walk(dir, found = []) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return found
  }

  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.isDirectory()) continue
    if (SKIP_DIRS.has(entry.name)) continue

    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, found)
    } else if (EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
      found.push(full)
    }
  }

  return found
}

const files = TARGETS.flatMap(target => {
  const root = join(ROOT, target)
  try {
    if (!statSync(root).isDirectory()) return []
  } catch {
    return []
  }
  return walk(root)
})

const violations = []

for (const file of files) {
  const source = readFileSync(file, 'utf8')
  source.split('\n').forEach((line, index) => {
    const match = line.match(EMOJI)
    if (match) {
      violations.push({
        file: relative(ROOT, file),
        line: index + 1,
        glyph: match[0],
        code: line.trim().slice(0, 90),
      })
    }
  })
}

if (violations.length) {
  console.error(`\n✗ emoji found in UI or data: ${violations.length}\n`)
  for (const v of violations.slice(0, 20)) {
    console.error(`  ${v.file}:${v.line}  ${v.glyph}`)
    console.error(`    ${v.code}`)
  }
  if (violations.length > 20) console.error(`  ...and ${violations.length - 20} more`)
  console.error('\nUse an icon from app/components/icons instead.\n')
  process.exit(1)
}

console.log(`✓ no emoji in ${files.length} UI and data files`)
