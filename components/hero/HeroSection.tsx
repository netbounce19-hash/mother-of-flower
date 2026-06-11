'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, type Variants } from 'framer-motion';
import Image from 'next/image';
import DropHintModal from '@/components/modals/DropHintModal';
import { products } from '@/data/products';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.8, ease: EASE } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE, delay: 0.3 } },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && isButtonVisible) {
      setIsButtonVisible(false);
    }
  });

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
          zIndex: 3, 
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
            textShadow: '0px 4px 24px rgba(254, 244, 245, 0.6)', // organic glow to separate from image
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
        <div 
          style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}
          onMouseEnter={() => setIsButtonVisible(true)}
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
              color: '#2D1E23', // Darker font
              textShadow: '0px 4px 24px rgba(254, 244, 245, 0.6)', // organic glow
              lineHeight: 0.9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              cursor: 'default',
              originX: 0,
              marginLeft: '5vw' // Shifted right so MOTHER appears relatively further left
            }}
          >
            OF FLO<span style={{ 
              backgroundColor: 'rgba(254, 244, 245, 0.35)', 
              backdropFilter: 'blur(16px)', 
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '24px',
              padding: '0 8px',
              marginLeft: '-4px', // slight negative margin to keep kerning tight
            }}>WER</span>
          </motion.h1>
          
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isButtonVisible ? 1 : 0, y: isButtonVisible ? 15 : -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => setIsHintOpen(true)}
            style={{
              pointerEvents: isButtonVisible ? 'auto' : 'none',
              position: 'absolute',
              top: '100%',
              left: '0',
              marginTop: '15px',
              padding: '12px 28px',
              borderRadius: '30px',
              border: '1px solid #9D5C69',
              color: '#9D5C69',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              backgroundColor: '#FEF4F5',
              boxShadow: '0 4px 16px rgba(157, 92, 105, 0.15)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            whileHover={{
              backgroundColor: '#9D5C69',
              color: '#FEF4F5',
            }}
          >
            Drop Hint
          </motion.button>
        </div>
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

      <DropHintModal product={products[0]} isOpen={isHintOpen} onClose={() => setIsHintOpen(false)} />
    </section>
  );
}
