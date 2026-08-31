import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Luxury Floral Artistry, ${site.city}`,
    short_name: site.name,
    description:
      'Curated luxury flower arrangements, hand-composed in Las Vegas and delivered the same day.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFDFD',
    theme_color: '#1C1C1C',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
