/**
 * Batch parsing, validation and gas modelling.
 *
 * Pure functions with no DOM and no React, so they can be exercised directly by
 * `node scripts/check-batch-parser.mjs`. The numbers here are the ones quoted in
 * the FAQ, so change them in both places if the model ever changes.
 */

export const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/
export const MAX_ROWS = 400

export const GAS_PER_STANDALONE_TRANSFER = 65000
export const GAS_BATCH_BASE = 21000
export const GAS_PER_BATCHED_RECIPIENT = 30500

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

    if (parts.length > 2) {
      row.error = 'Extra column found. Each line takes an address and an amount.'
    } else if (!address) {
      row.error = 'No address on this line.'
    } else if (!ADDRESS_PATTERN.test(address)) {
      const given = address.replace(/^0x/, '').length
      row.error = `Address has ${given} characters after 0x. An address has 40.`
    } else if (!amount) {
      row.error = 'No amount on this line.'
    } else if (!/^\d+(\.\d+)?$/.test(amount) || Number(amount) <= 0) {
      row.error = `"${amount}" is not a positive number.`
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
  const savedPercent = standaloneGas ? Math.round((1 - batchGas / standaloneGas) * 100) : 0

  return {
    valid,
    invalid,
    total,
    standaloneGas,
    batchGas,
    savedPercent,
    canSend: valid.length > 0 && invalid.length === 0,
  }
}
