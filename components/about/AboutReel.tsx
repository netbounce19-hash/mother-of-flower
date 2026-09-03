'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/useMediaPreferences';

/*
 * H.264 MP4, which every browser can decode — the original was HEVC in a .mov
 * container, which Firefox refuses outright and Chrome only plays on some
 * platforms. Re-encode with `npm run video:compress` after replacing the source.
 *
 * TODO(media): the poster is a still from the product photography rather than a
 * frame of the clip, so there is a visible jump when playback starts.
 */
const SOURCES = [{ src: '/videos/about-reel-720p.mp4', type: 'video/mp4' }];
const POSTER = '/videos/about-reel-poster.webp';

export default function AboutReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { margin: '-20% 0px -20% 0px' });
  const reducedMotion = usePrefersReducedMotion();

  // Nothing is fetched until the section is actually on screen, and never when
  // the visitor has asked for reduced motion — they get the poster and a
  // manual play control instead.
  const [activated, setActivated] = useState(false);
  const shouldLoad = activated || (inView && !reducedMotion);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView || activated) el.play().catch(() => {/* autoplay policy */});
    else el.pause();
  }, [inView, activated, shouldLoad]);

  return (
    <div ref={containerRef} className="relative w-full">
      {shouldLoad ? (
        <motion.video
          ref={videoRef}
          poster={POSTER}
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="none"
          aria-label="Behind the scenes in the Mother of Flower studio"
          initial={{ filter: 'grayscale(100%)' }}
          whileHover={{ filter: 'grayscale(0%)' }}
          transition={{ duration: 0.6 }}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover',
            borderRadius: '1px',
          }}
        >
          {SOURCES.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </motion.video>
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="relative block w-full group"
          aria-label="Play the studio reel"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POSTER}
            alt=""
            className="w-full h-auto block rounded-[1px] grayscale"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-[#FDFDFD]/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <Play size={20} strokeWidth={1.8} className="ml-0.5 text-[#1C1C1C]" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
