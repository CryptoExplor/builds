#!/usr/bin/env node
/**
 * Production build into a second dist directory.
 *
 *   npm run build:check
 *
 * `next build` writes to `.next` by default, which is the directory `next dev`
 * is serving from. Running a build while dev is up overwrites it mid-request
 * and every /_next/static asset 404s until dev is restarted. This sets
 * NEXT_DIST_DIR (see next.config.js) so the check is harmless.
 *
 * The assignment is done here rather than in the package.json script because
 * `FOO=bar cmd` is POSIX shell syntax; on Windows npm runs scripts through
 * cmd.exe, which reads it as a command name and fails before next starts.
 */

import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'

// Run Next's own entry point instead of relying on `next` being on PATH: npm
// adds node_modules/.bin when it runs the script, a direct
// `node scripts/build-check.mjs` does not, and on Windows the command is
// next.cmd, which needs a shell. Resolving the real file works in every case.
const require = createRequire(import.meta.url)
const nextBin = require.resolve('next/dist/bin/next')

const result = spawnSync(process.execPath, [nextBin, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_DIST_DIR: '.next-build' },
})

if (result.error) {
  console.error(result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)
