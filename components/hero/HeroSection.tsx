'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE, delay: 0.5 } },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        backgroundColor: '#FDFDFD',
      }}
    >
      {/* Grain */}
      <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 10, opacity: 0.02 }} className="grain-overlay" />

      {/* Centered container */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          paddingTop: 100,
          paddingBottom: 60,
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 40,
          position: 'relative',
          zIndex: 20,
        }}
      >
        {/* ── Left: Typography ──────────────────────── */}
        <motion.div
          style={{ y: textY, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: 40 }}
          >
            Custom Floral Artistry · Las Vegas
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.88 }}
          >
            {['Custom', 'Floral', 'Design.'].map((word, i) => (
              <motion.h1
                key={word}
                variants={lineVariants}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(3.8rem, 8.5vw, 8.5rem)',
                  fontWeight: 400,
                  fontStyle: i === 2 ? 'italic' : 'normal',
                  color: '#1C1C1C',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
                  marginLeft: i === 1 ? 'clamp(16px, 3vw, 60px)' : 0,
                  userSelect: 'none',
                }}
              >
                {word}
              </motion.h1>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{ marginTop: 40, fontSize: 14, color: '#8A8A8A', lineHeight: 1.8, maxWidth: 340 }}
          >
            Seasonal blooms, artfully composed. Delivered to your door across Nevada and beyond.
          </motion.p>

          <motion.a
            href="#catalog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{
              marginTop: 36,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1C1C1C',
              borderBottom: '1px solid #1C1C1C',
              paddingBottom: 4,
              width: 'fit-content',
              textDecoration: 'none',
            }}
          >
            Shop the Collection <ArrowRight size={13} />
          </motion.a>
        </motion.div>

        {/* ── Right: Arch image ─────────────────────── */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="arch-mask"
            style={{
              y: imageY,
              width: 'clamp(260px, 28vw, 400px)',
              height: 'clamp(380px, 40vw, 580px)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=900&auto=format&fit=crop&q=85"
              alt="Luxury flower bouquet"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A8A8A' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, backgroundColor: '#C9A96E' }}
        />
      </motion.div>
    </section>
  );
}
