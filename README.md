<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# TrustScope Marketing Website

A modern, professional marketing website for TrustScope - Evidence Infrastructure for AI Agents.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Pages

- `/` - Homepage with hero, stats, features, social proof
- `/features` - Detailed feature breakdown
- `/pricing` - Pricing tiers with comparison table
- `/about` - Company story, team, values
- `/contact` - Contact form and options

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push to GitHub
2. Import in Vercel dashboard
3. Deploy automatically

### Domain Setup
1. Add custom domain in Vercel: `trustscope.ai`
2. Add DNS records as instructed
3. SSL is automatic

## Environment Variables

None required for the marketing site. The app links to `app.trustscope.ai` for the dashboard.

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  brand: {
    500: '#3b82f6', // Primary blue
    // ...
  }
}
```

### Content
All content is in the page files under `/app`. Edit directly:
- `app/page.tsx` - Homepage content
- `app/features/page.tsx` - Features content
- `app/pricing/page.tsx` - Pricing tiers
- `app/about/page.tsx` - Company info

### Components
Reusable components are in `/components`:
- `Header.tsx` - Navigation
- `Footer.tsx` - Footer with links

## Analytics

Add your analytics in `app/layout.tsx`:

```tsx
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX" />

// Plausible
<Script data-domain="trustscope.ai" src="https://plausible.io/js/script.js" />
```

## SEO

Metadata is configured in `app/layout.tsx`. Update:
- Title and description
- Open Graph images
- Twitter cards

## Performance

The site is optimized for:
- Core Web Vitals
- Mobile responsiveness
- Dark mode by default
- Minimal JavaScript

## License

Proprietary - TrustScope, Inc.
>>>>>>> dcf53e2 (Marketing website)
