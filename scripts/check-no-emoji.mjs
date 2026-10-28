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
 */

import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname

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

// Where emoji are not allowed. Scripts are excluded on purpose: their output
// goes to a terminal, not to a browser.
const TARGETS = ['app/**/*.{js,jsx,mjs}', 'lib/**/*.{js,mjs}', 'tools/**/*.js']

const files = TARGETS.flatMap(pattern => globSync(pattern, { cwd: ROOT }))

const violations = []

for (const file of files) {
  const source = readFileSync(`${ROOT}${file}`, 'utf8')
  source.split('\n').forEach((line, index) => {
    const match = line.match(EMOJI)
    if (match) {
      violations.push({
        file,
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
    console.error(`  ${relative('.', `${ROOT}${v.file}`)}:${v.line}  ${v.glyph}`)
    console.error(`    ${v.code}`)
  }
  if (violations.length > 20) console.error(`  ...and ${violations.length - 20} more`)
  console.error('\nUse an icon from app/components/icons instead.\n')
  process.exit(1)
}

console.log(`✓ no emoji in ${files.length} UI and data files`)
