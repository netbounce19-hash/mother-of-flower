'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};
const lineVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE, delay: 0.3 } },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        backgroundColor: '#FDFDFD',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Grain */}
      <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 10, opacity: 0.02 }} className="grain-overlay" />

      {/* Center Image */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          y: imageY,
          zIndex: 1,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: 800, maxHeight: '90vh' }}>
          <Image
            src="/images/hero-flowers.png"
            alt="Mother of Flower Bouquet"
            fill
            style={{ 
              objectFit: 'contain', 
              mixBlendMode: 'multiply',
              opacity: 0.95
            }}
            priority
          />
        </div>
      </motion.div>

      {/* Center Typography */}
      <motion.div
        style={{ 
          y: textY, 
          zIndex: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          pointerEvents: 'none'
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 0.88 }}
        >
          {['MOTHER OF', 'FLOWER'].map((word, i) => (
            <motion.h1
              key={word}
              variants={lineVariants}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(4rem, 12vw, 13rem)',
                fontWeight: 400,
                color: '#1C1C1C',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                userSelect: 'none',
                textTransform: 'uppercase',
                marginLeft: i === 1 ? 'clamp(20px, 5vw, 100px)' : 0,
              }}
            >
              {word}
            </motion.h1>
          ))}
        </motion.div>
      </motion.div>

      {/* Corner Elements */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        padding: 'clamp(24px, 4vw, 48px)', 
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 5
      }}>
        {/* Top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 80 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A8A8A', maxWidth: 200 }}
          >
            Custom Floral Artistry
          </motion.p>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ fontSize: 13, color: '#8A8A8A', lineHeight: 1.6, maxWidth: 260 }}
          >
            Seasonal blooms, artfully composed. Delivered to your door across Nevada and beyond.
          </motion.p>

          <motion.a
            href="#catalog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{
              pointerEvents: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1C1C1C',
              borderBottom: '1px solid #1C1C1C',
              paddingBottom: 4,
              textDecoration: 'none',
              marginBottom: 8
            }}
          >
            Shop the Collection <ArrowRight size={13} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
