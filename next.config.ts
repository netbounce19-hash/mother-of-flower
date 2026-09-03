import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The page used to live at a Russian transliteration on an all-English
      // site; the old URL has been shared with hotels and planners.
      { source: '/sotrud', destination: '/events', statusCode: 301 },
      { source: '/partnerships', destination: '/events', statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        // Files under public/ are served with `max-age=0, must-revalidate` by
        // default, so every repeat visit re-checks each image.
        //
        // Deliberately not `immutable`, unlike the videos handled in proxy.ts:
        // product photos get replaced under the same filename, and an immutable
        // year would leave visitors looking at the old picture. A week from
        // cache with a background refresh still picks a swap up.
        source: '/images/:file*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // hero-1.webp is requested at quality 85; without it listed here Next warns
    // and falls back to 75.
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
