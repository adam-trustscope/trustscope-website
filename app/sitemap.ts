import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trustscope.ai';

  // Core pages
  const corePages = [
    '',
    '/pricing',
    '/scanner',
    '/switch',
    '/comply',
    '/secure',
    '/cost',
    '/build',
    '/about',
    '/contact',
    '/blog',
    '/changelog',
  ];

  // Solutions pages
  const solutionPages = [
    '/solutions',
    '/solutions/stop-runaway-costs',
    '/solutions/prevent-data-leaks',
    '/solutions/debug-agents',
    '/solutions/pass-audits',
  ];

  // Compliance framework pages
  const compliancePages = [
    '/compliance',
    '/compliance/soc2',
    '/compliance/eu-ai-act',
    '/compliance/nist',
    '/compliance/iso42001',
  ];

  // Integration pages
  const integrationPages = [
    '/integrations',
    '/langchain',
    '/llamaindex',
    '/crewai',
    '/autogen',
    '/openai-agents',
    '/google-adk',
    '/semantic-kernel',
    '/direct-api',
  ];

  // Feature pages
  const featurePages = [
    '/features',
    '/features/traces',
  ];

  // Legal pages
  const legalPages = [
    '/privacy',
    '/terms',
    '/security',
    '/dpa',
  ];

  // Other pages
  const otherPages = [
    '/leadership',
    '/incidents',
    '/developers',
  ];

  const allPages = [
    ...corePages,
    ...solutionPages,
    ...compliancePages,
    ...integrationPages,
    ...featurePages,
    ...legalPages,
    ...otherPages,
  ];

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.includes('/compliance') || path.includes('/solutions') ? 0.8 : 0.6,
  }));
}
