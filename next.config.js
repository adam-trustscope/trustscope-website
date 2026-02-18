/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep Turbopack root anchored to this repo to avoid parent-lockfile warnings.
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
