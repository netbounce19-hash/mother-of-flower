import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/catalog`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/sotrud`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
