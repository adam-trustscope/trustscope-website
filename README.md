# TrustScope Marketing Website

Marketing website for TrustScope — AI agent governance platform.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Render

## Quick Start

```bash
npm install
npm run dev    # http://localhost:3001
npm run build  # production build
```

## Site Structure

### Platform pages
- `/visibility` — 27 detection engines, Agent DNA, integration paths
- `/enforcement` — Policy modes (simulate/alert/block), OWASP mapping
- `/evidence` — Signed compliance evidence, framework coverage

### Other pages
- `/` — Homepage
- `/pricing` — Tier comparison (Monitor/Protect/Enforce/Govern)
- `/features` — Full engine matrix and capabilities
- `/incidents` — Production AI failure patterns
- `/developers` — Integration paths and SDK docs
- `/compliance` — Framework hub (AIUC-1, SOC 2, EU AI Act, NIST, ISO 42001)
- `/scanner` — Browser-based trace analyzer
- `/switch` — Model comparison tool
- `/blog` — Blog with MDX posts

## Environment Variables

None required. The app links to `app.trustscope.ai` for the dashboard.

## License

Proprietary — TrustScope, Inc.
