'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone, Calendar, Sparkles } from 'lucide-react';

interface EventsHeroProps {
  onOpenBooking: () => void;
  onOpenCall: () => void;
}

export default function EventsHero({ onOpenBooking, onOpenCall }: EventsHeroProps) {
  return (
    <section className="relative w-full min-h-[68vh] md:min-h-[75vh] flex items-center justify-center bg-[#FAF8F4] overflow-hidden border-b border-[#E5E2DB]">
      {/* Light organic floral texture background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-multiply">
        <Image
          src="/images/cream_cloud.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-110 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F4]/80 via-[#FAF8F4]/40 to-[#FAF8F4]" />
      </div>

      {/* Subtle organic floral radial glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#EAE3D2]/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#F2ECE1]/60 blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2"
        >
          <span className="text-[#8A6A2E] text-[12px] md:text-[13px] uppercase tracking-[0.28em] font-semibold flex items-center gap-2">
            <Sparkles size={14} className="text-[#8A6A2E]" />
            Mother of Flower · Las Vegas
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[#1C1C1C] text-[clamp(2.4rem,5.5vw,4.2rem)] font-normal leading-[1.1] tracking-tight max-w-3xl"
        >
          Pop-Up Picnics &amp; Bespoke Events
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#555555] text-[15px] md:text-[17px] font-normal leading-relaxed max-w-2xl text-balance"
        >
          Curated outdoor picnic experiences for proposals, birthdays, anniversaries, and intimate celebrations across scenic locations in Las Vegas &amp; Lake Mead.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-3 w-full sm:w-auto"
        >
          <a
            href="#packages"
            className="w-full sm:w-auto px-9 py-4 bg-[#1C1C1C] text-[#FDFDFD] text-[13px] font-bold uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#8A6A2E] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm no-underline"
          >
            <Calendar size={15} />
            Explore Packages
          </a>
          <button
            onClick={onOpenCall}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#1C1C1C] text-[#1C1C1C] text-[13px] font-bold uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#1C1C1C] hover:text-[#FDFDFD] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone size={15} />
            Request Callback
          </button>
        </motion.div>

        {/* Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 mt-6 border-t border-[#E5E2DB] w-full text-left"
        >
          {[
            { label: 'Scenic Locations', desc: 'Lake Mead, Sunset Strip & Private Estates' },
            { label: 'Artisanal Styling', desc: 'Rugs, cushions, glassware & candlelight' },
            { label: 'Signature Florals', desc: 'Handcrafted fresh floral artistry' },
            { label: 'Turnkey Service', desc: 'Delivery, full setup & discreet cleanup' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              <span className="text-[#8A6A2E] text-[12px] font-bold uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-[#666666] text-[12px] leading-snug">
                {item.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
