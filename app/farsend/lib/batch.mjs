/**
 * Batch parsing, validation and gas modelling.
 *
 * Pure functions with no DOM and no React, so they can be exercised directly by
 * `node scripts/check-batch-parser.mjs`. The numbers here are the ones quoted in
 * the FAQ, so change them in both places if the model ever changes.
 */

import { keccak256 } from 'js-sha3'

export const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/
export const MAX_ROWS = 400

// The preview shows a total, and a total it cannot show exactly would be a lie.
// Eight decimal places covers ETH at wei granularity in practice, so amounts
// with more than that are rejected rather than silently rounded.
export const MAX_DECIMALS = 8

// An ERC20 transfer sent on its own pays the 21,000 transaction base cost plus
// roughly 30,000 of work, about 51,000 in total. Inside a batch the base cost is
// paid once and each extra recipient costs the transfer work only. These are the
// figures published on the page, so they live here and the tests check the band.
export const GAS_PER_STANDALONE_TRANSFER = 51000
export const GAS_BATCH_BASE = 21000
export const GAS_PER_BATCHED_RECIPIENT = 30500

/**
 * EIP-55 checksum encoding: the case of each hex letter is decided by the
 * keccak256 hash of the lowercase address.
 */
export function toChecksumAddress(address) {
  const lower = address.toLowerCase().replace(/^0x/, '')
  const hash = keccak256(lower)
  let out = '0x'
  for (let i = 0; i < 40; i += 1) {
    out += parseInt(hash[i], 16) >= 8 ? lower[i].toUpperCase() : lower[i]
  }
  return out
}

/**
 * EIP-55 says a mixed case address carries a checksum and must match it. An all
 * lowercase or all uppercase address carries none, so there is nothing to
 * verify and both are accepted, which is what wallets and ethers do.
 */
export function isChecksumValid(address) {
  const body = address.slice(2)
  if (body === body.toLowerCase() || body === body.toUpperCase()) return true
  return address === toChecksumAddress(address)
}

/**
 * The demo rows shown on load. Derived from fixed strings, so they belong to
 * nobody. The previous sample used the USDC contract and the FarSend contract
 * as recipients, which would strand tokens if anyone sent the demo list for
 * real. `npm test` asserts these survive validation, checksums included.
 */
export const SAMPLE_BATCH = [
  '0x469FB0013a0Db909e0A5C743f333Fc222d9709De, 120.5',
  '0xEBa9fd6F3D03EB48aa2b519CdC9229F9fbF3d26e, 48',
  '0x53564093F2e48cb7311bE9853Bb99795927C6457, 300.25',
].join('\n')

/**
 * Parse one line per recipient, "address amount".
 * Returns every row, valid or not, with `error` set to a plain sentence naming
 * the problem. Rows past MAX_ROWS are dropped and reported through `truncated`.
 */
export function parseBatch(input) {
  const lines = String(input ?? '').split('\n')
  const seen = new Map()
  const rows = []

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (!trimmed) return

    const lineNumber = index + 1
    if (rows.length >= MAX_ROWS) return

    const parts = trimmed.split(/[\s,;]+/).filter(Boolean)
    const [address, amount] = parts
    const row = { line: lineNumber, address: address || '', amount: amount || '', error: null }

    const amountValue = Number(amount)

    if (parts.length > 2) {
      row.error = 'Extra column found. Each line takes an address and an amount.'
    } else if (!address) {
      row.error = 'No address on this line.'
    } else if (!address.startsWith('0x')) {
      row.error = 'Address must start with 0x.'
    } else if (!ADDRESS_PATTERN.test(address)) {
      const given = address.replace(/^0x/, '').length
      const isHex = /^[0-9a-fA-F]*$/.test(address.replace(/^0x/, ''))
      if (!isHex) {
        row.error = 'Address has a character that is not a hex digit.'
      } else if (given !== 40) {
        row.error = `Address has ${given} characters after 0x. An address has 40.`
      } else {
        row.error = 'Address is not valid.'
      }
    } else if (!isChecksumValid(address)) {
      // Casing is part of the address. A wrong case is either a typo or a
      // different address, and either way it must not reach a send.
      row.error = `Checksum does not match. A mixed case address carries its own check. Try ${toChecksumAddress(address)}.`
    } else if (!amount) {
      row.error = 'No amount on this line.'
    } else if (!/^\d+(\.\d+)?$/.test(amount)) {
      row.error = `"${amount}" is not a positive number.`
    } else if (!Number.isFinite(amountValue)) {
      row.error = `"${amount}" is too large to total.`
    } else if (amountValue <= 0) {
      row.error = 'Amount must be more than zero.'
    } else if ((amount.split('.')[1] || '').length > MAX_DECIMALS) {
      row.error = `More than ${MAX_DECIMALS} decimal places. Round the amount first.`
    } else {
      const key = address.toLowerCase()
      if (seen.has(key)) {
        row.error = `Same address as line ${seen.get(key)}.`
      } else {
        seen.set(key, lineNumber)
      }
    }

    rows.push(row)
  })

  return { rows, truncated: rows.length >= MAX_ROWS }
}

/** Totals and gas model for a set of parsed rows. Invalid rows are excluded. */
export function summarize(rows) {
  const valid = rows.filter(row => !row.error)
  const invalid = rows.filter(row => row.error)
  const total = valid.reduce((sum, row) => sum + Number(row.amount), 0)

  const payable = valid.length
  const standaloneGas = payable * GAS_PER_STANDALONE_TRANSFER
  const batchGas = payable ? GAS_BATCH_BASE + payable * GAS_PER_BATCHED_RECIPIENT : 0
  // Batching a single transfer saves nothing; it can even cost marginally more.
  // Never report a negative saving as if it were one.
  const savedPercent = standaloneGas
    ? Math.max(0, Math.round((1 - batchGas / standaloneGas) * 100))
    : 0

  return {
    valid,
    invalid,
    total,
    // A sum of valid amounts can still overflow if a list is pathological.
    totalFinite: Number.isFinite(total),
    standaloneGas,
    batchGas,
    savedPercent,
    canSend: valid.length > 0 && invalid.length === 0 && Number.isFinite(total),
  }
}
