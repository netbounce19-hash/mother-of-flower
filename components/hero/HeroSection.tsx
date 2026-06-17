'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import Image from 'next/image';
import { Typewriter } from '@/components/ui/Typewriter';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

export default function HeroSection() {
  // Slides with image paths
  const slides = [
    { id: 1, imageUrl: '/images/hero-1.jpg' },
    { id: 2, imageUrl: '/images/hero-2.jpg' },
    { id: 3, imageUrl: '/images/hero-3.jpg' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh', // full viewport height
        backgroundColor: '#FDFDFD',
      }}
    >
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        pagination={{
          clickable: true,
        }}
        keyboard={true}
        mousewheel={{
          releaseOnEdges: true,
        }}
        modules={[EffectCreative, Pagination, Keyboard, Mousewheel]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full select-none">
            <div 
              style={{ 
                width: '100%', 
                height: '100%', 
                position: 'relative',
                backgroundColor: '#1C1C1C' // Dark background while loading
              }}
            >
              <Image 
                src={slide.imageUrl} 
                alt={`Hero Slide ${slide.id}`} 
                fill 
                style={{ objectFit: 'cover' }} 
                priority={slide.id === 1} // Only preload the first image
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
          pointerEvents: 'none', // Allows swiping over the overlay
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}
      >
        <div className="text-center px-4" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
          <h1>
            <Typewriter
              className="text-[clamp(32px,5vw,60px)] font-bold tracking-tighter uppercase text-[#FDFDFD]"
              words={["Custom Floral Designs"]}
              speed={80}
              delayBetweenWords={2000}
              cursor={false}
            />
          </h1>
        </div>

        <motion.a
          href="#catalog"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            pointerEvents: 'auto', // Enable clicks just for the button
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
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FDFDFD';
            e.currentTarget.style.color = '#1C1C1C';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(28,28,28,0.3)';
            e.currentTarget.style.color = '#FDFDFD';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Shop Now
        </motion.a>
      </div>
    </section>
  );
}
