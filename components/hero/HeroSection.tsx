'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/useMediaPreferences';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Once the visitor works the button, the automatic rules stop overriding
  // them — otherwise any re-run of the effect below pauses what they started.
  const userControlled = useRef(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || userControlled.current) return;

    // Four megabytes is a lot to spend on decoration for someone on a slow
    // connection or a metered plan. They get the poster and the play button.
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string; downlink?: number };
      }
    ).connection;
    // `effectiveType` is coarse — Chrome reports "3g" for links that stream this
    // clip perfectly well — so the estimated bandwidth is the better signal.
    // Below 2 Mbps a 1.2 Mbps encode buffers, and nobody wants a stuttering
    // background loop.
    const frugal =
      connection?.saveData === true ||
      ['slow-2g', '2g'].includes(connection?.effectiveType ?? '') ||
      (typeof connection?.downlink === 'number' && connection.downlink < 2);

    if (reducedMotion || frugal) {
      video.pause();
      // Nothing beyond the poster gets fetched until the visitor asks for it.
      video.preload = 'none';
      // Reflecting the real playback state is the point of this effect; the
      // rule fires on any setState inside one, but there is no render-time
      // value to derive this from.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(false);
    } else {
      // Autoplay may be blocked by the browser — keep the button honest.
      video.play().catch(() => setIsPlaying(false));
    }
  }, [reducedMotion]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    userControlled.current = true;

    if (video.paused) {
      // play() starts the fetch on its own; calling load() first would reset
      // the element and abort the play we are about to request.
      if (video.preload === 'none') video.preload = 'metadata';
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      aria-label="Hero showcase"
      className="relative w-full bg-[#FAF8F4] overflow-hidden border-b border-[#E5E2DB]"
      style={{ minHeight: 'calc(100svh - 72px)' }}
    >
      {/* Subtle background grain texture */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none grain-overlay"
        aria-hidden="true"
      />

      <div className="site-container relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center min-h-[calc(100svh-72px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ── LEFT COLUMN: EDITORIAL CONTENT & ACTIONS ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Studio Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#8A8A8A]">
                Artisan Floral Studio · Las Vegas
              </span>
            </motion.div>

            {/* Main Editorial Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[38px] sm:text-[50px] md:text-[58px] xl:text-[66px] leading-[1.06] tracking-[-0.03em] font-serif text-[#1C1C1C] mb-6"
            >
              Custom Floral Designs <br className="hidden sm:block" />
              <span className="italic font-normal font-serif text-[#8A8A8A]">
                Crafted with Soul
              </span>
            </motion.h1>

            {/* Editorial Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16px] sm:text-[18px] text-[#555555] leading-relaxed max-w-xl mb-9 font-light"
            >
              Curated seasonal blooms, sculptural signature roses, and bespoke arrangements hand-composed to elevate life&apos;s most meaningful celebrations.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                href="/catalog"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1C1C1C] text-[#FDFDFD] text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-[#C9A96E] hover:text-[#1C1C1C] transition-all duration-300 shadow-[0_8px_20px_rgba(28,28,28,0.15)] group"
              >
                <span>Shop Collection</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#custom-request"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#1C1C1C] text-[#1C1C1C] text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-[#1C1C1C] hover:text-[#FDFDFD] transition-all duration-300"
              >
                <span>Bespoke Order</span>
              </Link>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-[#E5E2DB] grid grid-cols-2 sm:grid-cols-3 gap-4 text-[12px] text-[#6A6A6A] font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#C9A96E]">✦</span> Same-Day Delivery
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A96E]">✦</span> Farm-Fresh Stems
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="text-[#C9A96E]">✦</span> Luxury Gift Box
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: FRAMED VIDEO IN PASSE-PARTOUT ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[440px]"
            >
              {/* Outer Passe-Partout Frame */}
              <div className="relative bg-[#FDFDFD] p-3.5 sm:p-4 rounded-[28px] border border-[#E5E2DB] shadow-[0_24px_60px_-15px_rgba(28,28,28,0.1)]">
                
                {/* Delicate Inner Framing Contour */}
                <div className="relative rounded-[20px] border border-[#E5E2DB]/70 overflow-hidden bg-[#1C1C1C]">
                  
                  {/* Aspect Ratio Container for the Video */}
                  <div className="relative w-full aspect-[4/5] bg-[#1C1C1C]">
                    
                    {/* Poster image fallback / placeholder while video is loading */}
                    <Image
                      src="/images/hero-1.webp"
                      alt="Mother of Flower Luxury Arrangement"
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 440px"
                      quality={85}
                      className={`object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                      priority
                    />

                    {/* Muted AutoPlay Hero Video */}
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      // The poster carries the first paint; the clip itself is
                      // decoration, so it must not compete with the page for
                      // bandwidth. "metadata" lets the browser decide when.
                      preload="metadata"
                      poster="/images/hero-1.webp"
                      onLoadedData={() => setVideoLoaded(true)}
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/videos/hero-720p.mp4" type="video/mp4" />
                    </video>

                    {/* Top Floating Video Controls */}
                    <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                        className="w-8 h-8 rounded-full bg-[#1C1C1C]/60 backdrop-blur-md text-[#FDFDFD] border border-white/20 flex items-center justify-center hover:bg-[#1C1C1C] transition-colors"
                      >
                        {isPlaying ? (
                          <Pause size={13} strokeWidth={2} />
                        ) : (
                          <Play size={13} strokeWidth={2} className="ml-0.5" />
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Passe-partout bottom label signature */}
                <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-[#8A8A8A] uppercase tracking-[0.16em]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={11} className="text-[#C9A96E]" /> Las Vegas Atelier
                  </span>
                  <span>Handcrafted Daily</span>
                </div>

              </div>

              {/* Decorative background accent circle */}
              <div
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 -z-10 blur-[1px] hidden sm:block"
                aria-hidden="true"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
