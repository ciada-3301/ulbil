import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/librarian', '/admin', '/dashboard/api/']
    },
    sitemap: 'https://ulbil.org/sitemap.xml'
  };
}
