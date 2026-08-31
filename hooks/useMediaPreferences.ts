'use client';

import { useEffect, useState } from 'react';

function useMediaQuery(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const mq = window.matchMedia(query);
    // Read after mount: matchMedia does not exist during SSR, so seeding state
    // synchronously would mean a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/**
 * True when the device genuinely supports hover. Touch screens report
 * `(hover: none)`, where a hover-only preview is pure wasted bandwidth.
 */
export function useCanHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/** Honours the OS "reduce motion" setting. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** Viewport is at least `px` wide. */
export function useMinWidth(px: number): boolean {
  return useMediaQuery(`(min-width: ${px}px)`);
}
