import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trustscope.ai';

  const pages = [
    '',
    '/scanner',
    '/pricing',
    '/developers',
    '/features',
    '/secure',
    '/cost',
    '/switch',
    '/incidents',
    '/compliance',
    '/compliance/aiuc-1',
    '/compliance/soc2',
    '/compliance/eu-ai-act',
    '/compliance/nist',
    '/compliance/iso42001',
    '/about',
    '/contact',
    '/langchain',
    '/crewai',
    '/autogen',
    '/openai-agents',
    '/google-adk',
    '/llamaindex',
    '/semantic-kernel',
    '/direct-api',
    '/privacy',
    '/terms',
    '/security',
    '/dpa',
    '/verify',
  ];

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.includes('/compliance') ? 0.8 : 0.6,
  }));
}
