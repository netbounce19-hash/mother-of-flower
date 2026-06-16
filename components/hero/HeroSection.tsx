'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import DropHintModal from '@/components/modals/DropHintModal';
import { products } from '@/data/products';

export default function HeroSection() {
  const [isHintOpen, setIsHintOpen] = useState(false);

  // Placeholder slides for the Swiper
  const slides = [
    { id: 1, bgColor: '#EAE5DF', text: 'SLIDE 1 (PLACEHOLDER)' },
    { id: 2, bgColor: '#D9D0C7', text: 'SLIDE 2 (PLACEHOLDER)' },
    { id: 3, bgColor: '#C2B8B1', text: 'SLIDE 3 (PLACEHOLDER)' },
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
        loop={true}
        modules={[EffectCreative, Pagination, Keyboard]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full select-none">
            <div 
              style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: slide.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ 
                color: '#8A8A8A', 
                fontSize: '14px', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)'
              }}>
                {slide.text}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Title & Button centered over the slider */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none', // Allows swiping over the text
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: 400,
            color: '#1C1C1C',
            lineHeight: 0.9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textAlign: 'center',
            textShadow: '0 4px 40px rgba(253,253,253,0.8)' // Strong glow so text is readable on any background
          }}
        >
          MOTHER
          <br />
          OF FLOWER
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setIsHintOpen(true)}
          style={{
            pointerEvents: 'auto', // Enable clicks just for the button
            marginTop: '50px',
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
