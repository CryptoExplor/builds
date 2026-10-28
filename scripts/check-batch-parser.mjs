#!/usr/bin/env node
/**
 * Checks the batch parser and gas model used by the FarSend landing page.
 *
 *   node scripts/check-batch-parser.mjs
 *
 * No test framework: this repo has none, and the surface here is one pure
 * module. Exits non zero on the first failed expectation.
 */

import {
  parseBatch,
  summarize,
  MAX_ROWS,
  GAS_PER_STANDALONE_TRANSFER,
  GAS_BATCH_BASE,
  GAS_PER_BATCHED_RECIPIENT,
} from '../app/farsend/lib/batch.mjs'

let passed = 0
const failures = []

function check(name, condition, detail = '') {
  if (condition) {
    passed += 1
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`)
  }
}

const A = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
const B = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const C = '0x8878b70a01bdda92ab8ea48dd7893b64c69298c0'

// ── Happy path ────────────────────────────────────────────────────────────
const happy = parseBatch(`${A}, 120.5\n${B} 48\n${C};300.25`)
check('parses three rows', happy.rows.length === 3, `got ${happy.rows.length}`)
check('comma, space and semicolon all separate', happy.rows.every(r => !r.error), JSON.stringify(happy.rows.map(r => r.error)))
check('amounts are read', happy.rows[0].amount === '120.5', happy.rows[0].amount)
check('line numbers track the source', happy.rows[2].line === 3, String(happy.rows[2].line))

// ── Blank lines do not shift line numbers ─────────────────────────────────
const blanks = parseBatch(`${A}, 1\n\n\n${B}, 2`)
check('blank lines are skipped', blanks.rows.length === 2)
check('blank lines do not desync numbering', blanks.rows[1].line === 4, String(blanks.rows[1].line))

// ── Rejections ────────────────────────────────────────────────────────────
const short = parseBatch(`${A.slice(0, 20)}, 1`)
check('short address is rejected', Boolean(short.rows[0].error))
check('short address error states the count', short.rows[0].error?.includes('18'), short.rows[0].error)

const missingAmount = parseBatch(`${A}`)
check('missing amount is rejected', missingAmount.rows[0].error === 'No amount on this line.')
check('missing amount does not count as valid', summarize(missingAmount.rows).valid.length === 0)

for (const bad of ['0', '-5', 'abc', '1.2.3', '']) {
  const parsed = parseBatch(`${B}, ${bad}`)
  check(`amount ${JSON.stringify(bad)} is rejected`, Boolean(parsed.rows[0]?.error) || parsed.rows.length === 0)
}

const extra = parseBatch(`${A}, 1, 2`)
check('a third column is rejected', extra.rows[0].error?.includes('Extra column'), String(extra.rows[0].error))

// ── Duplicates, case insensitive ──────────────────────────────────────────
const dupe = parseBatch(`${A}, 1\n${A.toLowerCase()}, 2`)
check('duplicate address is caught', dupe.rows[1].error?.includes('line 1'), String(dupe.rows[1].error))
check('only the first duplicate is valid', summarize(dupe.rows).valid.length === 1)

// ── Empty and whitespace input ────────────────────────────────────────────
for (const empty of ['', '   ', '\n\n']) {
  const parsed = parseBatch(empty)
  check(`empty input ${JSON.stringify(empty)} parses to zero rows`, parsed.rows.length === 0)
  check(`empty input ${JSON.stringify(empty)} cannot send`, summarize(parsed.rows).canSend === false)
}

// ── Row cap ───────────────────────────────────────────────────────────────
const many = Array.from({ length: MAX_ROWS + 25 }, (_, i) =>
  `0x${(i + 1).toString(16).padStart(40, '0')}, 1`
).join('\n')
const capped = parseBatch(many)
check('row cap is enforced', capped.rows.length === MAX_ROWS, `got ${capped.rows.length}`)
check('row cap reports truncation', capped.truncated === true)
check('an under cap list is not flagged', parseBatch(`${A}, 1`).truncated === false)

// ── Gas model, against the numbers quoted in the FAQ ──────────────────────
const sum = summarize(parseBatch(`${A}, 120.5\n${B}, 48\n${C}, 300.25`).rows)
check('total adds the amounts', Math.abs(sum.total - 468.75) < 1e-9, String(sum.total))
check('no saved percent on an empty list', summarize([]).savedPercent === 0)

// The page claims 40% to 60% from three recipients upward, and up to about 53%
// on long lists. Anything outside that band would be a false claim on the page.
for (const n of [3, 4, 10, 100, 400]) {
  const rows = Array.from({ length: n }, (_, i) => ({
    address: `0x${(i + 1).toString(16).padStart(40, '0')}`,
    amount: '1',
    error: null,
  }))
  const s = summarize(rows)
  check(`gas maths holds at n=${n}`, s.standaloneGas === n * GAS_PER_STANDALONE_TRANSFER)
  check(`batch gas holds at n=${n}`, s.batchGas === GAS_BATCH_BASE + n * GAS_PER_BATCHED_RECIPIENT)
  check(`saving at n=${n} is within the advertised band`, s.savedPercent >= 40 && s.savedPercent <= 60, `${s.savedPercent}%`)
}

// Very short lists save less, which the copy now says out loud instead of
// claiming a flat 40 to 60 percent.
const one = summarize([{ address: A, amount: '1', error: null }])
check('a single recipient saves less than the headline band', one.savedPercent < 40, `${one.savedPercent}%`)
check('a single recipient still saves something', one.savedPercent > 0, `${one.savedPercent}%`)

const growth = [3, 10, 400].map(n =>
  summarize(Array.from({ length: n }, (_, i) => ({ address: `0x${i.toString(16).padStart(40, '0')}`, amount: '1', error: null }))).savedPercent
)
check('saving grows with the list', growth[0] < growth[1] && growth[1] < growth[2], growth.join(' < '))
check('saving tops out at the 53% asymptote the copy quotes', growth[2] <= 53, `${growth[2]}%`)

// ── Mixed valid and invalid ───────────────────────────────────────────────
const mixed = summarize(parseBatch(`${A}, 5\nbad, 1\n${B}, 5`).rows)
check('invalid rows block sending', mixed.canSend === false)
check('invalid rows are excluded from the total', Math.abs(mixed.total - 10) < 1e-9, String(mixed.total))
check('invalid rows are listed', mixed.invalid.length === 1)

// ── Report ────────────────────────────────────────────────────────────────
if (failures.length) {
  console.error(`\n✗ ${failures.length} failed, ${passed} passed\n`)
  for (const failure of failures) console.error(`  ${failure}`)
  process.exit(1)
}

console.log(`✓ batch parser and gas model: ${passed} checks passed`)
