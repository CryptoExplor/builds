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
  toChecksumAddress,
  isChecksumValid,
  SAMPLE_BATCH,
  MAX_ROWS,
  MAX_DECIMALS,
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

// The page claims the saving grows with the list and approaches about 40% on
// long lists, for ERC20 transfers. Anything outside that band is a false claim.
for (const n of [2, 3, 10, 100, 400]) {
  const rows = Array.from({ length: n }, (_, i) => ({
    address: `0x${(i + 1).toString(16).padStart(40, '0')}`,
    amount: '1',
    error: null,
  }))
  const s = summarize(rows)
  check(`gas maths holds at n=${n}`, s.standaloneGas === n * GAS_PER_STANDALONE_TRANSFER)
  check(`batch gas holds at n=${n}`, s.batchGas === GAS_BATCH_BASE + n * GAS_PER_BATCHED_RECIPIENT)
  check(`saving at n=${n} is within the advertised band`, s.savedPercent >= 0 && s.savedPercent <= 40, `${s.savedPercent}%`)
}

// Very short lists save less, which the copy now says out loud instead of
// claiming a flat 40 to 60 percent.
const one = summarize([{ address: A, amount: '1', error: null }])
check('a single recipient saves nothing, and is never shown a negative saving', one.savedPercent === 0, `${one.savedPercent}%`)
check('a single recipient costs about the same either way', Math.abs(one.batchGas - one.standaloneGas) < 1000, `${one.batchGas} vs ${one.standaloneGas}`)

const growth = [3, 10, 400].map(n =>
  summarize(Array.from({ length: n }, (_, i) => ({ address: `0x${i.toString(16).padStart(40, '0')}`, amount: '1', error: null }))).savedPercent
)
check('saving grows with the list', growth[0] < growth[1] && growth[1] < growth[2], growth.join(' < '))
check('saving tops out at the 40% asymptote the copy quotes', growth[2] === 40, `${growth[2]}%`)

// ── Mixed valid and invalid ───────────────────────────────────────────────
const mixed = summarize(parseBatch(`${A}, 5\nbad, 1\n${B}, 5`).rows)
check('invalid rows block sending', mixed.canSend === false)
check('invalid rows are excluded from the total', Math.abs(mixed.total - 10) < 1e-9, String(mixed.total))
check('invalid rows are listed', mixed.invalid.length === 1)

// ── The shipped sample must be valid, checksums included ───────────────────
const sample = summarize(parseBatch(SAMPLE_BATCH).rows)
check('the demo rows all pass validation', sample.invalid.length === 0, JSON.stringify(sample.invalid.map(r => r.error)))
check('the demo rows are sendable', sample.canSend === true)
// The old sample paid the USDC contract and the FarSend contract.
for (const bad of ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', '0x8878b70a01bdda92ab8ea48dd7893b64c69298c0']) {
  check(`the demo rows no longer include ${bad.slice(0, 10)}…`, !SAMPLE_BATCH.toLowerCase().includes(bad.slice(2)))
}

// ── EIP-55 checksums ───────────────────────────────────────────────────────
// Official vectors from the EIP.
const VECTORS = [
  '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
  '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
  '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
  '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb',
]
for (const vector of VECTORS) {
  check(`checksum matches the EIP-55 vector ${vector.slice(0, 10)}…`, isChecksumValid(vector), vector)
  check(`recomputing the checksum is stable for ${vector.slice(0, 10)}…`, toChecksumAddress(vector.toLowerCase()) === vector)
}

// A mixed case address with one letter flipped is a different address.
const flipped = '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAeD'
check('a case flipped mixed address is rejected', !isChecksumValid(flipped))
check('the flipped address is reported as a checksum error', parseBatch(`${flipped}, 1`).rows[0].error?.includes('Checksum'), parseBatch(`${flipped}, 1`).rows[0].error)

// All lowercase and all uppercase carry no checksum and stay accepted.
check('all lowercase is accepted', isChecksumValid(VECTORS[0].toLowerCase()))
check('all uppercase is accepted', isChecksumValid('0x' + VECTORS[0].slice(2).toUpperCase()))

// Length and checksum errors stay distinct.
const shortErr = parseBatch('0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAe, 1').rows[0].error
check('a short address reports length, not checksum', shortErr?.includes('characters after 0x'), shortErr)
const nonHex = parseBatch('0xZZAeb6053F3E94C9b9A09f33669435E7Ef1BeAed, 1').rows[0].error
check('a non hex address reports the character', nonHex?.includes('hex digit'), nonHex)
const noPrefix = parseBatch('5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed, 1').rows[0].error
check('a missing 0x prefix is named', noPrefix?.includes('0x'), noPrefix)

// ── Amounts that cannot be represented ─────────────────────────────────────
const huge = parseBatch(`${A}, ${'9'.repeat(309)}`).rows[0]
check('a 309 digit amount is rejected', Boolean(huge.error), huge.error)
check('the overflow error says it is too large', huge.error?.includes('too large'), huge.error)
check('an overflowing list cannot send', summarize(parseBatch(`${A}, ${'9'.repeat(309)}`).rows).canSend === false)

check('zero is rejected with a clear reason', parseBatch(`${A}, 0`).rows[0].error?.includes('more than zero'), parseBatch(`${A}, 0`).rows[0].error)
check('a negative is rejected', Boolean(parseBatch(`${A}, -5`).rows[0].error))

const tooPrecise = parseBatch(`${A}, 0.${'1'.repeat(MAX_DECIMALS + 1)}`).rows[0]
check('more decimals than the preview can show is rejected', tooPrecise.error?.includes('decimal places'), tooPrecise.error)
check('exactly the maximum decimals is accepted', !parseBatch(`${A}, 0.${'1'.repeat(MAX_DECIMALS)}`).rows[0].error)
check('a small amount stays valid so it is not displayed as 0.00', !parseBatch(`${A}, 0.001`).rows[0].error)

// A total is only sendable if it is a finite number.
const big = summarize(Array.from({ length: 3 }, () => ({ address: A, amount: '1e308', error: null })))
check('a total that overflows is flagged', big.totalFinite === false)

// ── Report ────────────────────────────────────────────────────────────────
if (failures.length) {
  console.error(`\n✗ ${failures.length} failed, ${passed} passed\n`)
  for (const failure of failures) console.error(`  ${failure}`)
  process.exit(1)
}

console.log(`✓ batch parser and gas model: ${passed} checks passed`)
