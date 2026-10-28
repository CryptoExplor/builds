#!/usr/bin/env node
/**
 * Fails if an emoji appears in the shipped UI or in the tool registry data.
 *
 *   node scripts/check-no-emoji.mjs
 *
 * Catches every way an emoji can be spelled: a single pictograph, a ZWJ
 * sequence, a regional-indicator flag pair, or a digit-plus-keycap. It does not
 * ban arrows (→), em dashes (—), or ™. Those are typography, not emoji, and an
 * earlier version of this guard banned ™ and glued "Sheets(TM) add-on" into
 * "Sheetsadd-on".
 *
 * Walks with readdirSync. fs.globSync only exists from Node 22 and CI pins 18.
 * Output is ASCII so the checker cannot flag itself if it is ever pointed at
 * scripts/.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

// Shipped UI and registry data. Scripts are out of scope: their output goes to
// a terminal, not a browser. CSS is in scope even though it holds no text today,
// because a `content:` value is drawn in the UI like any other glyph.
const TARGETS = ['app', 'lib', 'tools']
const EXTENSIONS = ['.js', '.jsx', '.mjs', '.css']
const SKIP_DIRS = new Set(['node_modules', '.next', '.next-build', '.git', 'dist', 'build'])

// Extended_Pictographic is the accurate property, but it also covers a handful
// of characters that are simple typography here: (c), (R), TM and the info
// symbol. Those stay legal. Arrows and dashes are not pictographic at all.
const ALLOWED = new Set(['\u00A9', '\u00AE', '\u2122', '\u2139'])
const PICTOGRAPHIC = /\p{Extended_Pictographic}/u

// Extended_Pictographic alone is not exhaustive. A regional indicator (the
// halves of 🇺🇸) is Emoji_Presentation but not pictographic, and a keycap such
// as 1️⃣ is a plain digit followed by U+FE0F U+20E3, none of them pictographic.
const PRESENTATION = /\p{Emoji_Presentation}/u
const SEQUENCE = new Set(['\uFE0F', '\uFE0E', '\u20E3'])

/** First character in the line that counts as emoji, or null. */
function findEmoji(line) {
  for (const char of line) {
    if (ALLOWED.has(char)) continue
    if (SEQUENCE.has(char)) return char
    if (char === '\u200D') return char
    if (PICTOGRAPHIC.test(char) || PRESENTATION.test(char)) return char
  }
  return null
}

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
    const glyph = findEmoji(line)
    if (glyph) {
      violations.push({
        file: relative(ROOT, file),
        line: index + 1,
        glyph,
        code: line.trim().slice(0, 90),
      })
    }
  })
}

if (violations.length) {
  console.error(`\nFAIL: emoji found in UI or data: ${violations.length}\n`)
  for (const v of violations.slice(0, 20)) {
    console.error(`  ${v.file}:${v.line}  U+${v.glyph.codePointAt(0).toString(16).toUpperCase()}`)
    console.error(`    ${v.code}`)
  }
  if (violations.length > 20) console.error(`  ...and ${violations.length - 20} more`)
  console.error('\nDraw the mark from app/components/icons instead, or use plain text.\n')
  process.exit(1)
}

console.log(`ok: no emoji in ${files.length} UI and data files`)
