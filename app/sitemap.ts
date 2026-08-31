import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { allProductSlugs } from '@/lib/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/catalog`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/partnerships`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/refund-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    // Every bouquet, generated from the catalogue so new items appear on their own.
    ...allProductSlugs().map((slug) => ({
      url: `${site.url}/catalog/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
