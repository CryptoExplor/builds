/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't use 'export' - breaks server features
  // Use default or 'standalone' for Vercel
  //
  // `npm run build:check` sets NEXT_DIST_DIR so a production build can be
  // verified while `next dev` is running. Without it, `next build` overwrites
  // .next underneath the dev server and every /_next/static asset 404s, which
  // renders the site as unstyled HTML until dev is restarted.
  distDir: process.env.NEXT_DIST_DIR || '.next',
}

module.exports = nextConfig
