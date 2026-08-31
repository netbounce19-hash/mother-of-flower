'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/useMediaPreferences';

/*
 * TODO(media): `about-reel.mov` is a 6.7 MB QuickTime file, which Firefox will
 * not play at all. Re-encode to H.264 MP4 (~1.5 MB) plus a WebM track and drop
 * the sources in below:
 *   ffmpeg -i about-reel.mov -vcodec libx264 -crf 26 -preset slow -movflags +faststart -an about-reel.mp4
 *   ffmpeg -i about-reel.mov -c:v libvpx-vp9 -crf 34 -b:v 0 -an about-reel.webm
 * The poster is currently a still from the product photography, not a frame of
 * the video — replace it when re-encoding.
 */
const SOURCES = [{ src: '/videos/about-reel.mov', type: 'video/quicktime' }];
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
