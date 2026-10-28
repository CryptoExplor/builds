#!/usr/bin/env node
/**
 * Renders every icon in app/components/icons/icon-data.mjs into a single static
 * page so the set can be reviewed at a glance, and validates the geometry.
 *
 *   node scripts/build-icon-sheet.mjs           # validate, then write the sheet
 *   node scripts/build-icon-sheet.mjs --check   # validate only, write nothing
 *
 * `npm test` uses --check so a test run never touches the working tree.
 * `npm run icons` writes docs/icon-sheet.html for review in a browser.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ICONS, ICON_NAMES } from '../app/components/icons/icon-data.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// ── Integrity checks, so the single source cannot quietly rot ───────────────
const problems = []
const KNOWN = new Set(['path', 'circle', 'rect'])

for (const name of ICON_NAMES) {
  const icon = ICONS[name]
  if (!Array.isArray(icon.ops) || icon.ops.length === 0) {
    problems.push(`${name}: has no ops`)
    continue
  }
  for (const [tag, attrs] of icon.ops) {
    if (!KNOWN.has(tag)) problems.push(`${name}: unknown op "${tag}"`)
    if (tag === 'path') {
      if (!attrs.d || /undefined|NaN/.test(attrs.d)) problems.push(`${name}: bad path data`)
      if (!/^[Mm]/.test(attrs.d)) problems.push(`${name}: path must start with a move command`)
    }
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'd') continue
      if (typeof v !== 'number' || !Number.isFinite(v)) problems.push(`${name}: ${k} is not a number`)
      else if (v < 0 || v > 24) problems.push(`${name}: ${k}=${v} falls outside the 24 grid`)
    }
  }
}

if (problems.length) {
  console.error(`\nFAIL: icon set: ${problems.length} problem(s)`)
  for (const problem of problems) console.error(`  ${problem}`)
  process.exit(1)
}

function toSvg(name, size, stroke = 1.5) {
  const icon = ICONS[name]
  const filled = Boolean(icon.filled)
  const body = icon.ops
    .map(([tag, a]) => {
      if (tag === 'path') return `<path d="${a.d}"/>`
      if (tag === 'circle') return `<circle cx="${a.cx}" cy="${a.cy}" r="${a.r}"/>`
      return `<rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" rx="${a.rx}"/>`
    })
    .join('')

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" ` +
    `fill="${filled ? 'currentColor' : 'none'}" stroke="${filled ? 'none' : 'currentColor'}" ` +
    `stroke-width="${filled ? '' : stroke}" stroke-linecap="round" stroke-linejoin="round" ` +
    `aria-hidden="true" focusable="false">${body}</svg>`
  )
}

const cells = ICON_NAMES.map(name => {
  const label = name.replace(/([A-Z])/g, ' $1').toLowerCase()
  return `
    <figure class="cell">
      <div class="glyph">${toSvg(name, 40)}</div>
      <div class="sizes">${toSvg(name, 24)}${toSvg(name, 16)}${toSvg(name, 14)}</div>
      <figcaption><span class="name">${name}</span><span class="label">${label}</span></figcaption>
    </figure>`
}).join('')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Icon sheet · ${ICON_NAMES.length} marks</title>
<style>
  :root {
    --bg: #181818;
    --panel: #1F1F1F;
    --line: #272727;
    --ink: #FFFFFF;
    --muted: rgba(255,255,255,0.55);
    --accent: #5FBFA0;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 48px 24px 96px;
    background: var(--bg);
    color: var(--ink);
    font: 400 16px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 1080px; margin: 0 auto; }
  h1 { font-size: 30px; line-height: 1.2; letter-spacing: -0.02em; margin: 0 0 8px; font-weight: 600; }
  p.sub { color: var(--muted); margin: 0 0 40px; max-width: 60ch; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 12px;
  }
  .cell {
    margin: 0;
    background: var(--panel);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .glyph { color: var(--ink); line-height: 0; }
  .sizes { display: flex; align-items: center; gap: 14px; color: var(--muted); }
  .sizes svg { display: block; }
  figcaption { display: flex; flex-direction: column; gap: 2px; }
  .name { font-size: 14px; font-weight: 600; }
  .label { font-size: 12px; color: var(--muted); }
  .bar {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap; margin: 0 0 32px;
    padding: 16px 24px; background: var(--panel); border-radius: 16px;
  }
  .bar span { color: var(--muted); font-size: 14px; }
  .bar b { color: var(--ink); font-weight: 600; }
  .onlight { background: #F4F4F4; }
  .onlight .name, .onlight .glyph { color: #111; }
  .onlight .label { color: #555; }
  .onlight .sizes { color: #111; }
  h2 { font-size: 18px; margin: 48px 0 16px; font-weight: 600; }
</style>
</head>
<body>
<div class="wrap">
  <h1>Icon sheet</h1>
  <p class="sub">${ICON_NAMES.length} marks, one grid: 24&times;24, 1.5px strokes, round joins, drawn for this site.
  Filled marks carry brand or glyph weight; everything else is stroked. Colour is always
  <code>currentColor</code>.</p>

  <div class="bar">
    <span><b>${ICON_NAMES.length}</b> icons</span>
    <span>shown at 40, 24 and 16, with a 14px legibility check</span>
    <span>stroke <b>1.5</b> · viewBox <b>24</b></span>
  </div>

  <div class="grid">${cells}</div>

  <h2>On a light surface</h2>
  <div class="grid">${ICON_NAMES.map(n => `
    <figure class="cell onlight">
      <div class="glyph">${toSvg(n, 32)}</div>
      <figcaption><span class="name">${n}</span></figcaption>
    </figure>`).join('')}</div>
</div>
</body>
</html>
`

const checkOnly = process.argv.includes('--check')

if (checkOnly) {
  console.log(`ok: ${ICON_NAMES.length} icons, all within the 24 grid`)
} else {
  const out = join(root, 'docs', 'icon-sheet.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  console.log(`ok: ${ICON_NAMES.length} icons -> docs/icon-sheet.html`)
}
