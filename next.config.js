/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export', // Enable static exports
};

module.exports = nextConfig;