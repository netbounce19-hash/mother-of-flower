'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Menu } from 'lucide-react';
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
  const miniCardY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        backgroundColor: '#151214',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Grain */}
      <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 10, opacity: 0.04, mixBlendMode: 'overlay' }} className="grain-overlay" />

      {/* Main Center Image */}
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
        <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: 700, maxHeight: '85vh' }}>
          <Image
            src="/images/hero-dark-flowers.png"
            alt="Mother of Flower Bouquet"
            fill
            style={{ 
              objectFit: 'cover', 
              mixBlendMode: 'screen',
              opacity: 0.85
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
          pointerEvents: 'none',
          position: 'relative',
          left: '-5vw' // slightly shifted left to match reference composition with the side card
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 0.85 }}
        >
          {['MOTHER', 'OF FLOWER'].map((word, i) => (
            <motion.h1
              key={word}
              variants={lineVariants}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(5rem, 14vw, 15rem)',
                fontWeight: 300,
                color: '#F4F0E6',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                userSelect: 'none',
                textTransform: 'uppercase',
                marginLeft: i === 1 ? 'clamp(40px, 8vw, 120px)' : 0,
              }}
            >
              {word}
            </motion.h1>
          ))}
        </motion.div>
      </motion.div>

      {/* Mini Card (Right Side) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: EASE }}
        style={{
          position: 'absolute',
          right: 'clamp(20px, 5vw, 80px)',
          top: '30%',
          width: 'clamp(200px, 20vw, 320px)',
          height: 'clamp(320px, 35vw, 500px)',
          border: '1px solid rgba(244, 240, 230, 0.1)',
          zIndex: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          y: miniCardY
        }}
      >
        {/* Card Background */}
        <Image
          src="/images/hero-dark-flowers.png"
          alt="Mother of Flower Mini"
          fill
          style={{ 
            objectFit: 'cover', 
            objectPosition: 'center 20%',
            opacity: 0.6,
            mixBlendMode: 'screen'
          }}
        />
        {/* Card Top Text */}
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.2em', color: '#F4F0E6', textTransform: 'uppercase', opacity: 0.6 }}>Mother of Flower</span>
        </div>
        {/* Card Center Text */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', lineHeight: 0.9 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 3vw, 3.5rem)', color: '#F4F0E6', fontWeight: 300, letterSpacing: '-0.02em' }}>MOTHER</h2>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 3vw, 3.5rem)', color: '#F4F0E6', fontWeight: 300, letterSpacing: '-0.02em', marginLeft: 20 }}>OF FLOWER</h2>
        </div>
        {/* Circular text at bottom (simulated with SVG) */}
        <div style={{ position: 'absolute', bottom: -20, left: -20, opacity: 0.4 }}>
          <svg viewBox="0 0 100 100" width="120" height="120">
            <path id="curve" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
            <text fontSize="10" fill="#F4F0E6" letterSpacing="2">
              <textPath href="#curve" startOffset="0%">
                MONO BOUQUETS · MONO BOUQUETS · 
              </textPath>
            </text>
          </svg>
        </div>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 40 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#F4F0E6', opacity: 0.6 }}
          >
            Mother of Flower
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              border: '1px solid rgba(244, 240, 230, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              color: '#F4F0E6',
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
          >
            <Menu size={20} strokeWidth={1} />
          </motion.button>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, paddingBottom: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ maxWidth: 220 }}
          >
            <h3 style={{ fontSize: 12, fontWeight: 600, color: '#F4F0E6', marginBottom: 4 }}>MOTHER OF FLOWER</h3>
            <p style={{ fontSize: 11, color: '#F4F0E6', opacity: 0.5, lineHeight: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              IS A FLORAL DESIGN STUDIO BASED IN NEW YORK CITY, USA.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{ maxWidth: 280, marginRight: 'clamp(220px, 25vw, 360px)' /* offset for the mini card */ }}
          >
            <p style={{ fontSize: 12, color: '#F4F0E6', opacity: 0.6, lineHeight: 1.6 }}>
              We create stunning florals for weddings and special events that integrate beautifully with season and location. We love natural materials, new ideas, and simple beauty.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
