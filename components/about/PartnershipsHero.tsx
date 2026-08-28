'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PartnershipsHero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-[#1C1C1C] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1C1C1C]/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-[#C9A96E] text-[11px] uppercase tracking-[0.25em] font-semibold">
            Partnerships
          </p>
          <div style={{ width: 32, height: 1, backgroundColor: '#C9A96E', opacity: 0.6 }} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#FDFDFD] font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.1] max-w-3xl"
        >
          Partner with Mother of Flower
        </motion.h1>
      </div>
    </section>
  );
}
