/**
 * The icon geometry for the whole site. One source of truth.
 *
 * House rules, so every mark looks drawn by the same hand:
 *
 *   - 24 x 24 grid. Nothing important sits closer than 2px to an edge.
 *   - 1.5px strokes, round caps, round joins. No sharp corners.
 *   - Geometry lands on the half pixel so strokes stay crisp when centred.
 *   - Open shapes only. Closed decorative containers are banned: a circle
 *     means a circular thing (a globe, a check), never decoration.
 *   - Brand marks and marks that read as glyphs (github, x, zap, boxes, star)
 *     are filled; everything else is stroked, so the set has two weights and
 *     stays legible down to 14px.
 *
 * Ops are plain data, not JSX, so the same definitions feed both the React
 * components in ./index.jsx and scripts/build-icon-sheet.mjs.
 */

const p = d => ['path', { d }]
const c = (cx, cy, r) => ['circle', { cx, cy, r }]
const rect = (x, y, width, height, rx) => ['rect', { x, y, width, height, rx }]

export const ICONS = {
  // ── Brands ────────────────────────────────────────────────────────────────
  github: {
    filled: true,
    ops: [
      p(
        'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z'
      ),
    ],
  },

  xSocial: {
    filled: true,
    ops: [
      p(
        'M17.53 3h3.02l-6.6 7.54L21.75 21h-6.06l-4.75-6.2L5.5 21H2.47l7.06-8.07L2.25 3h6.21l4.29 5.67L17.53 3Zm-1.06 16.2h1.67L7.6 4.72H5.8l10.67 14.48Z'
      ),
    ],
  },

  // ── Navigation and direction ──────────────────────────────────────────────
  arrowLeft: { ops: [p('M20 12H4.5'), p('M10.5 18 4.5 12l6-6')] },
  arrowUpRight: { ops: [p('M6.5 17.5 17.5 6.5'), p('M8.5 6.5h9v9')] },
  external: {
    ops: [
      p('M13.5 4H20v6.5'),
      p('M20 4l-8 8'),
      p('M18.5 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h3.5'),
    ],
  },
  menu: { ops: [p('M4 7h16'), p('M4 12h16'), p('M4 17h11')] },
  close: { ops: [p('m6.2 6.2 11.6 11.6'), p('M17.8 6.2 6.2 17.8')] },

  // ── Things in the world ───────────────────────────────────────────────────
  globe: {
    ops: [
      c(12, 12, 9),
      p('M3 12h18'),
      p('M12 3c2.4 2.5 3.7 5.6 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.6-3.7-9s1.3-6.5 3.7-9Z'),
    ],
  },
  mapPin: {
    ops: [
      p('M12 21.2c4.4-4 6.6-7.2 6.6-10.2a6.6 6.6 0 1 0-13.2 0c0 3 2.2 6.2 6.6 10.2Z'),
      c(12, 10.8, 2.5),
    ],
  },
  calendar: {
    ops: [
      rect(3.2, 5, 17.6, 15.8, 2.4),
      p('M3.2 10h17.6'),
      p('M8.2 3.2v3.6'),
      p('M15.8 3.2v3.6'),
    ],
  },
  mail: {
    ops: [rect(3, 5, 18, 14, 2.6), p('m4 7 6.9 5.2a1.8 1.8 0 0 0 2.2 0L20 7')],
  },
  tag: {
    ops: [
      p(
        'M20.3 13.2 13.2 20.3a2 2 0 0 1-2.8 0l-6.7-6.7a2 2 0 0 1-.6-1.4V5.2a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l6.8 6.8a2 2 0 0 1 0 2.6Z'
      ),
      c(8.2, 8.2, 1.5),
    ],
  },
  boxes: {
    filled: true,
    ops: [rect(3, 4, 18, 4.4, 1.6), rect(3, 10.2, 13, 4.4, 1.6), rect(3, 16.4, 8, 4.4, 1.6)],
  },

  // ── Actions ───────────────────────────────────────────────────────────────
  search: { ops: [c(11, 11, 6.5), p('m20.2 20.2-4.4-4.4')] },
  searchX: {
    ops: [
      c(11, 11, 6.5),
      p('m8.9 8.9 4.2 4.2'),
      p('m13.1 8.9-4.2 4.2'),
      p('m20.2 20.2-4.4-4.4'),
    ],
  },
  filter: { ops: [p('M3.8 5.6h16.4l-6.4 7.7v5.7l-3.6 2v-7.7L3.8 5.6Z')] },
  plus: { ops: [p('M12 4.8v14.4'), p('M4.8 12h14.4')] },
  trash: {
    ops: [
      p('M4.4 7h15.2'),
      p('M9.4 7V5.6a1.6 1.6 0 0 1 1.6-1.6h2a1.6 1.6 0 0 1 1.6 1.6V7'),
      p('M6.3 7l.9 12.1A1.9 1.9 0 0 0 9.1 21h5.8a1.9 1.9 0 0 0 1.9-1.9L17.7 7'),
      p('M10.3 11v6'),
      p('M13.7 11v6'),
    ],
  },

  // ── Status ────────────────────────────────────────────────────────────────
  checkCircle: { ops: [c(12, 12, 8.8), p('m8.1 12.2 2.7 2.7 5.3-5.3')] },
  alert: { ops: [c(12, 12, 8.8), p('M12 7.6v5.2'), p('M12 16.2v.1')] },
  shield: {
    ops: [
      p('M12 3 4.7 5.9v5.5c0 4.2 3 7.9 7.3 9.4 4.3-1.5 7.3-5.2 7.3-9.4V5.9L12 3Z'),
      p('m8.9 11.9 2.3 2.3 4.1-4.1'),
    ],
  },
  star: {
    ops: [
      p('m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.6Z'),
    ],
  },

  // ── Product concepts ──────────────────────────────────────────────────────
  zap: { filled: true, ops: [p('M13 3 5.5 13.2h5.2L11 21l7.5-10.2h-5.2L13 3Z')] },
  code: { ops: [p('m8.6 7.4-5.1 4.6 5.1 4.6'), p('m15.4 7.4 5.1 4.6-5.1 4.6')] },
  target: { ops: [c(12, 12, 8.8), c(12, 12, 5), c(12, 12, 1.4)] },
  rocket: {
    ops: [
      p(
        'M12 2.6c2.7 2 4.3 5 4.3 8.6 0 2.3-.7 4.4-1.9 6.2H9.6c-1.2-1.8-1.9-3.9-1.9-6.2 0-3.6 1.6-6.6 4.3-8.6Z'
      ),
      c(12, 9.6, 1.6),
      p('M9.6 17.4 7.2 20.4l2.9-.3'),
      p('M14.4 17.4l2.4 3-2.9-.3'),
      p('M12 20.4V21.6'),
    ],
  },
  compass: { ops: [c(12, 12, 8.8), p('m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z')] },
  layers: {
    ops: [
      p('m12 3.2 8.6 4.3-8.6 4.3-8.6-4.3L12 3.2Z'),
      p('m3.4 12.2 8.6 4.3 8.6-4.3'),
      p('m3.4 16.6 8.6 4.3 8.6-4.3'),
    ],
  },
  cube: {
    ops: [
      p('M12 2.9 20.4 7.5v9L12 21.1 3.6 16.5v-9L12 2.9Z'),
      p('m3.9 7.6 8.1 4.6 8.1-4.6'),
      p('M12 12.2v8.6'),
    ],
  },
  route: {
    ops: [
      c(6.4, 17.5, 2.6),
      c(17.6, 5.5, 2.6),
      p('M9 17.5h5.5a3 3 0 0 0 0-6H9.5a3 3 0 0 1 0-6h5.5'),
    ],
  },
  chartUp: {
    ops: [
      p('M4 3.6v15.8a1 1 0 0 0 1 1h15'),
      p('m7.6 16.2 3.6-4.3 3 2.6 4.6-5.7'),
      c(18.8, 8.8, 1.2),
    ],
  },
}

/** Every icon name, in the order they are drawn above. */
export const ICON_NAMES = Object.keys(ICONS)
