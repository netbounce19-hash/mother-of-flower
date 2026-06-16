'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import DropHintModal from '@/components/modals/DropHintModal';
import { products } from '@/data/products';

export default function HeroSection() {
  const [isHintOpen, setIsHintOpen] = useState(false);

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
              {/* Fallback color/placeholder is removed, we now render the image directly */}
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

      {/* Overlay Button centered over the slider */}
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
        }}
      >
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setIsHintOpen(true)}
          style={{
            pointerEvents: 'auto', // Enable clicks just for the button
            padding: '14px 40px',
            borderRadius: '40px',
            border: '1px solid #1C1C1C',
            color: '#1C1C1C',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            backgroundColor: 'rgba(253,253,253,0.6)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1C1C1C';
            e.currentTarget.style.color = '#FDFDFD';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(253,253,253,0.6)';
            e.currentTarget.style.color = '#1C1C1C';
          }}
        >
          Drop Hint
        </motion.button>
      </div>

      <DropHintModal product={products[0]} isOpen={isHintOpen} onClose={() => setIsHintOpen(false)} />
    </section>
  );
}
