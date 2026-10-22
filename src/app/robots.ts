import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/librarian', '/admin', '/dashboard/api/', '/emails', '/api/emails/']
    },
    sitemap: 'https://ulbil.org/sitemap.xml'
  };
}
