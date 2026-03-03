/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Framework pages → /developers
      { source: '/langchain', destination: '/developers', permanent: true },
      { source: '/crewai', destination: '/developers', permanent: true },
      { source: '/autogen', destination: '/developers', permanent: true },
      { source: '/openai-agents', destination: '/developers', permanent: true },
      { source: '/google-adk', destination: '/developers', permanent: true },
      { source: '/llamaindex', destination: '/developers', permanent: true },
      { source: '/semantic-kernel', destination: '/developers', permanent: true },
      { source: '/direct-api', destination: '/developers', permanent: true },
      { source: '/integrations', destination: '/developers', permanent: true },

      // Old use case pages → new structure
      { source: '/build', destination: '/visibility', permanent: true },
      { source: '/secure', destination: '/visibility', permanent: true },
      { source: '/cost', destination: '/visibility', permanent: true },
      { source: '/comply', destination: '/evidence', permanent: true },

      // Old solution pages → new structure
      { source: '/solutions', destination: '/', permanent: true },
      { source: '/solutions/stop-runaway-costs', destination: '/visibility', permanent: true },
      { source: '/solutions/prevent-data-leaks', destination: '/visibility', permanent: true },
      { source: '/solutions/pass-audits', destination: '/evidence', permanent: true },
      { source: '/solutions/debug-agents', destination: '/developers', permanent: true },

      // Other
      { source: '/leadership', destination: '/about', permanent: true },
    ]
  },
}

module.exports = nextConfig
