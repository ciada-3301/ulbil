import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ulbil.org';
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/anniversary',
    '/catalogue',
    '/leadership',
    '/services',
    '/notices',
    '/gallery',
    '/membership',
    '/contact',
    '/donate',
    '/auth/signin',
    '/auth/signup'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/notices' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/anniversary' || route === '/membership' ? 0.9 : 0.8
  }));
}
