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
          paddingLeft: 'clamp(30px, 10vw, 150px)', // Organic left spacing
          display: 'flex', 
          flexDirection: 'column', 
          gap: 10
        }}
      >
        <motion.h1
          variants={lineVariants}
          whileHover={{ 
            letterSpacing: '0.23em', 
            scale: 1.02,
            color: '#9D5C69',
            x: 10
          }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.5rem, 6vw, 7rem)',
            fontWeight: 400,
            color: '#2D1E23', // Darker font as requested
            lineHeight: 0.9,
            letterSpacing: '0.2em', // Wide tracking like the reference
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            cursor: 'default',
            originX: 0
          }}
        >
          MOTHER
        </motion.h1>
        <motion.h1
          variants={lineVariants}
          whileHover={{ 
            letterSpacing: '0.23em', 
            scale: 1.02,
            color: '#9D5C69',
            x: 10
          }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.5rem, 6vw, 7rem)',
            fontWeight: 400,
            color: '#2D1E23', // Darker font
            lineHeight: 0.9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            cursor: 'default',
            originX: 0
          }}
        >
          OF FLOWER
        </motion.h1>
      </motion.div>

      {/* Right side Image overlapping text with smooth fade */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '60vw', // Take up slightly more than half to overlap text
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          y: imageY,
          zIndex: 2, // Placed ON TOP of text
          pointerEvents: 'none'
        }}
      >
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%', 
          minHeight: 600,
          // CSS mask to create a smooth transition on the left edge!
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)'
        }}>
          <Image
            src="/images/hero-light-roses.png"
            alt="Mother of Flower Bouquet"
            fill
            style={{ 
              objectFit: 'cover', 
              objectPosition: 'left center', // Keep image aligned left so flowers overlap the text
              mixBlendMode: 'multiply', 
              opacity: 0.95
            }}
            priority
          />
        </div>
      </motion.div>

    </section>
  );
}
