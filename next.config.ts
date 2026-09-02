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
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
