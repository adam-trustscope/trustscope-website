/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: '/build', destination: '/developers', permanent: true },
      { source: '/integrations', destination: '/developers', permanent: true },
      { source: '/comply', destination: '/compliance', permanent: true },
      { source: '/solutions', destination: '/', permanent: true },
      { source: '/solutions/stop-runaway-costs', destination: '/cost', permanent: true },
      { source: '/solutions/prevent-data-leaks', destination: '/secure', permanent: true },
      { source: '/solutions/pass-audits', destination: '/compliance', permanent: true },
      { source: '/solutions/debug-agents', destination: '/developers', permanent: true },
      { source: '/leadership', destination: '/about', permanent: true },
    ]
  },
}

module.exports = nextConfig
