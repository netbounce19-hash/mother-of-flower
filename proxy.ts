import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Keeps preview and development deployments out of search results.
 *
 * robots.txt is identical on every host, so without this Google would index
 * `mother-of-flower.vercel.app` alongside the real domain as duplicates. Only
 * `VERCEL_ENV === 'production'` is allowed to be indexed.
 *
 * Note: this file is `proxy.ts`, not `middleware.ts` — Next.js 16 renamed the
 * convention, and `middleware` is deprecated.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const isProduction = process.env.VERCEL_ENV === 'production';
  if (!isProduction) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // Long-lived caching for the static video assets in /public, which Next
  // otherwise serves with `max-age=0, must-revalidate` and revalidates on
  // every visit.
  //
  // IMPORTANT: `immutable` means a browser will not re-check the file for a
  // year, so a new cut MUST get a new filename. Overwriting a video in place
  // leaves every returning visitor on the old one — that is exactly what
  // happened when hero.mp4 was re-encoded, hence the -720p suffixes.
  if (request.nextUrl.pathname.startsWith('/videos/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    // Everything except Next's own assets and the image optimiser.
    '/((?!_next/static|_next/image).*)',
  ],
};
