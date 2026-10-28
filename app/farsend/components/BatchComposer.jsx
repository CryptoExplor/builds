'use client'

/**
 * BatchComposer — the page's working demo.
 *
 * Paste a list, watch it validate, see what batching actually saves. Everything
 * runs in the browser: no network call, no list leaves the page. The gas model
 * is a stated estimate, not a quote, and the copy says so.
 *
 * States covered: populated, empty, error (per line, inline and specific),
 * loading (skeletons shaped like the numbers they replace), and disabled.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Alert, CheckCircle, External, Trash } from '@/app/components/icons'
import { MAX_ROWS, SAMPLE_BATCH, parseBatch, summarize } from '../lib/batch.mjs'

const formatNumber = value => new Intl.NumberFormat('en-US').format(value)
// Two decimals at minimum so a total reads like money, up to the eight the
// preview accepts, so a legitimate 0.001 is never displayed as 0.00.
const formatAmount = value =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(value)

export default function BatchComposer() {
  const [value, setValue] = useState(SAMPLE_BATCH)
  const [estimating, setEstimating] = useState(false)
  const timer = useRef(null)

  const { rows, truncated } = useMemo(() => parseBatch(value), [value])
  const { valid, invalid, total, totalFinite, standaloneGas, batchGas, savedPercent, canSend } =
    useMemo(
      () => summarize(rows),
      [rows]
    )

  // Re-estimating runs on a short, visible delay, and only when the number of
  // recipients changes. Editing an amount updates the total instantly; adding a
  // row is the moment that deserves a loading state. The first pass is skipped
  // so the initial render shows real numbers instead of skeletons that flash
  // on and straight back off.
  const firstPass = useRef(true)
  useEffect(() => {
    if (firstPass.current) {
      firstPass.current = false
      return
    }

    setEstimating(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setEstimating(false), 420)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [rows.length])

  return (
    <div className="rounded-2xl bg-surface-2 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">Batch preview</h2>
          <p className="text-sm text-white/60">Paste a list. Sample data is loaded.</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setValue(SAMPLE_BATCH)}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-white/60 transition-colors duration-300 ease-settle hover:bg-surface-3 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Reload sample
          </button>
          <button
            type="button"
            onClick={() => setValue('')}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/60 transition-colors duration-300 ease-settle hover:bg-surface-3 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Trash size={15} aria-hidden="true" />
            Clear
          </button>
        </div>
      </div>

      <label htmlFor="batch-input" className="mt-4 block text-sm font-medium text-white/70">
        Recipients, one per line
      </label>
      <textarea
        id="batch-input"
        value={value}
        onChange={event => setValue(event.target.value)}
        spellCheck={false}
        rows={5}
        placeholder={'0x…, 25.5\n0x…, 18'}
        aria-describedby="batch-input-help"
        className="mt-2 w-full resize-y border border-surface-3 bg-surface-1 p-4 font-mono text-sm leading-relaxed text-white placeholder:text-white/55 focus:border-accent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
      <p id="batch-input-help" className="mt-2 text-xs text-white/55">
        Address then amount, separated by a comma or a space. CSV and JSON import work in
        the app. Up to {MAX_ROWS} lines here.
      </p>

      {/* Empty state */}
      {rows.length === 0 ? (
        <div className="mt-4 border border-surface-3 bg-surface-1 p-6">
          <p className="text-sm font-semibold text-white">Nothing to send yet</p>
          <p className="mt-1 max-w-sm text-sm text-white/60">
            Paste your own list, or bring back the sample to see how the estimate works.
          </p>
          <button
            type="button"
            onClick={() => setValue(SAMPLE_BATCH)}
            className="mt-4 rounded-full border border-surface-4 px-3 py-2 text-sm font-semibold text-white transition-colors duration-300 ease-settle hover:bg-surface-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Load sample list
          </button>
        </div>
      ) : (
        <>
          {/* Row level results */}
          <ul className="mt-4 divide-y divide-surface-3 border border-surface-3 bg-surface-1">
            {rows.slice(0, 5).map(row => (
              <li
                key={row.line}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-white/70">
                  {row.error ? (
                    <Alert
                      size={15}
                      className="shrink-0 text-danger"
                      aria-hidden="true"
                    />
                  ) : (
                    <CheckCircle
                      size={15}
                      className="shrink-0 text-accent"
                      aria-hidden="true"
                    />
                  )}
                  <span className="truncate">
                    {row.address.slice(0, 10)}…{row.address.slice(-6)}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-xs text-white/70">{row.amount}</span>
              </li>
            ))}
            {rows.length > 5 ? (
              <li className="px-4 py-3 text-xs text-white/55">
                and {rows.length - 5} more {rows.length - 5 === 1 ? 'line' : 'lines'}
              </li>
            ) : null}
          </ul>

          {/* Errors, inline and specific */}
          {invalid.length > 0 ? (
            <div
              role="alert"
              className="mt-4 border border-danger/40 bg-surface-1 p-4"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-danger">
                <Alert size={16} aria-hidden="true" />
                {invalid.length === 1
                  ? 'One line needs a fix'
                  : `${invalid.length} lines need a fix`}
              </p>
              <ul className="mt-2 space-y-1">
                {invalid.slice(0, 3).map(row => (
                  <li key={row.line} className="text-sm text-white/70">
                    Line {row.line}: {row.error}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {truncated ? (
            <p className="mt-3 text-xs text-white/55">
              Only the first {MAX_ROWS} lines are counted. Split anything larger.
            </p>
          ) : null}

          {/* Summary */}
          <div aria-live="polite" className="mt-4 grid gap-4 sm:grid-cols-3">
            <SummaryCell label="Recipients" value={formatNumber(valid.length)} loading={estimating} />
            <SummaryCell
              label="Total to send, in token units"
              value={totalFinite ? formatAmount(total) : 'Too large'}
              loading={estimating}
            />
            <SummaryCell
              label="Gas saved"
              value={savedPercent > 0 ? `${savedPercent}%` : 'None'}
              hint={savedPercent > 0 ? `${formatNumber(standaloneGas)} gas down to ${formatNumber(batchGas)}` : undefined}
              loading={estimating}
              accent={savedPercent > 0}
            />
          </div>
        </>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xs text-xs text-white/55">
          Estimates only. The wallet shows the real figure before you sign. Your list is not
          carried into the app, so paste it there once more.
        </p>
        {canSend ? (
          <a
            href="https://farsend.vercel.app"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-base font-semibold text-surface-1 transition-colors duration-300 ease-settle hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Open batch sender
            <External
              size={17}
              aria-hidden="true"
              className="transition-transform duration-500 ease-settle group-hover:-translate-y-px"
            />
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-2 rounded-full bg-surface-4 px-3 py-2 text-base font-semibold text-white/55"
          >
            Open batch sender
            <External size={17} aria-hidden="true" />
          </span>
        )}
      </div>
    </div>
  )
}

function SummaryCell({ label, value, hint, loading, accent = false }) {
  return (
    <div>
      <p className="text-xs text-white/55">{label}</p>
      {loading ? (
        <div className="mt-2 h-7 w-24 animate-pulse rounded-sm bg-surface-4 motion-reduce:animate-none" aria-hidden="true" />
      ) : (
        <p
          className={`mt-1 font-mono text-2xl font-semibold ${
            accent ? 'text-accent' : 'text-white'
          }`}
        >
          {value}
        </p>
      )}
      {!loading && hint ? <p className="mt-1 text-xs text-white/55">{hint}</p> : null}
    </div>
  )
}
