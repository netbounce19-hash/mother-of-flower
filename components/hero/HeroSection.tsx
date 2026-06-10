'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import Image from 'next/image';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE, delay: 0.3 } },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        backgroundColor: '#FEF4F5',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Left side Typography */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
        style={{ 
          zIndex: 1, 
          paddingLeft: 'clamp(20px, 8vw, 120px)',
          display: 'flex', 
          flexDirection: 'column', 
          gap: 20
        }}
      >
        <motion.h1
          variants={lineVariants}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 400,
            color: '#9D5C69',
            lineHeight: 0.9,
            letterSpacing: '0.25em', // Wide tracking like the reference
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          MOTHER
        </motion.h1>
        <motion.h1
          variants={lineVariants}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 400,
            color: '#9D5C69',
            lineHeight: 0.9,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          OF FLOWER
        </motion.h1>
      </motion.div>

      {/* Right side Image overlapping text */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '55vw', // Take up slightly more than half to overlap text
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          y: imageY,
          zIndex: 2, // Placed ON TOP of text
          pointerEvents: 'none'
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 600 }}>
          <Image
            src="/images/hero-light-roses.png"
            alt="Mother of Flower Bouquet"
            fill
            style={{ 
              objectFit: 'cover', 
              objectPosition: 'left center', // Keep image aligned left so flowers overlap the text
              mixBlendMode: 'multiply', // This removes the white background and creates a beautiful overlap effect with the text underneath
              opacity: 0.95
            }}
            priority
          />
        </div>
      </motion.div>

    </section>
  );
}
