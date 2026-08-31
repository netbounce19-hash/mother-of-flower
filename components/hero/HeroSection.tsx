'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, EffectCreative, Keyboard, Mousewheel, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Typewriter } from '@/components/ui/Typewriter';
import { usePrefersReducedMotion } from '@/hooks/useMediaPreferences';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

const HERO_HEADING = 'Custom Floral Designs';

const slides = [
  { id: 1, imageUrl: '/images/hero-1.webp', alt: 'Red roses in a woven basket at an outdoor ceremony' },
  { id: 2, imageUrl: '/images/hero-2.webp', alt: 'A table set for a desert dinner, centred on red roses' },
  { id: 3, imageUrl: '/images/hero-3.webp', alt: 'Close-up of a pastel bouquet in soft daylight' },
];

const CONTROL =
  'w-11 h-11 rounded-full flex items-center justify-center bg-[#1C1C1C]/45 text-[#FDFDFD] ' +
  'backdrop-blur-sm border border-[#FDFDFD]/40 hover:bg-[#1C1C1C]/70 transition-colors';

export default function HeroSection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // WCAG 2.2.2: anything that moves for longer than 5s needs a pause control.
  const [playing, setPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reduced motion means the carousel never starts on its own.
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (reducedMotion || !playing) swiper.autoplay.stop();
    else swiper.autoplay.start();
  }, [playing, reducedMotion]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured arrangements"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        backgroundColor: '#FDFDFD',
      }}
    >
      <Swiper
        onSwiper={(s) => { swiperRef.current = s; }}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        grabCursor
        effect="creative"
        creativeEffect={{
          prev: { translate: [0, 0, -400] },
          next: { translate: ['100%', 0, 0] },
        }}
        loop
        autoplay={reducedMotion ? false : { delay: 6000, disableOnInteraction: false }}
        pagination={false}
        keyboard
        mousewheel={{ releaseOnEdges: true }}
        modules={[Autoplay, EffectCreative, Keyboard, Mousewheel, Pagination]}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={slide.id}
            className="w-full h-full select-none"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#1C1C1C' }}>
              <Image
                src={slide.imageUrl}
                alt={slide.alt}
                fill
                // One slide fills the viewport at every breakpoint; without an
                // explicit list the optimiser was fetching w=1920 then w=3840.
                sizes="100vw"
                quality={75}
                style={{ objectFit: 'cover' }}
                preload={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Text and Button centered over the slider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}
      >
        <div className="text-center px-4" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
          {/*
            The heading text ships in the HTML for crawlers and no-JS visitors;
            the typewriter is a visual layer on top of it.
          */}
          <h1 className="text-[clamp(32px,5vw,60px)] font-bold tracking-tighter uppercase text-[#FDFDFD]">
            <span className="sr-only">{HERO_HEADING}</span>
            <Typewriter aria-hidden="true" words={[HERO_HEADING]} speed={80} cursor={false} />
          </h1>
        </div>

        <motion.a
          href="#catalog"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hover:bg-[#FDFDFD] hover:text-[#1C1C1C]"
          style={{
            pointerEvents: 'auto',
            padding: '18px 56px',
            borderRadius: '50px',
            border: '1px solid rgba(253,253,253,0.8)',
            color: '#FDFDFD',
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            backgroundColor: 'rgba(28,28,28,0.3)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          Shop Now
        </motion.a>
      </div>

      {/* Carousel controls */}
      <div
        className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-3"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
          className={CONTROL}
        >
          <ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label={playing ? 'Pause the slideshow' : 'Play the slideshow'}
          aria-pressed={!playing}
          onClick={() => setPlaying((p) => !p)}
          className={CONTROL}
        >
          {playing && !reducedMotion
            ? <Pause size={16} strokeWidth={1.8} aria-hidden="true" />
            : <Play size={16} strokeWidth={1.8} className="ml-0.5" aria-hidden="true" />}
        </button>

        <div className="flex items-center gap-2 px-2" role="tablist" aria-label="Choose slide">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Slide ${i + 1} of ${slides.length}`}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className="tap-target rounded-full transition-all"
              style={{
                width: i === activeIndex ? 26 : 9,
                height: 9,
                backgroundColor: i === activeIndex ? '#FDFDFD' : 'rgba(253,253,253,0.5)',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className={CONTROL}
        >
          <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
