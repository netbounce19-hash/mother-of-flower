'use client';

import { motion } from 'framer-motion';

export default function PartnershipsHero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-[#1C1C1C] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
          alt="Partnerships Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C1C1C]/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#FDFDFD] text-[12px] md:text-[14px] uppercase tracking-[0.2em] font-bold"
        >
          Sotrudnichestvo
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#FDFDFD] font-sans text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight uppercase"
        >
          Partner with Mother of Flower
        </motion.h1>
      </div>
    </section>
  );
}
