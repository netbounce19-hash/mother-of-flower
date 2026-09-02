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
    <section className="relative w-full min-h-[75vh] md:min-h-[82vh] flex items-center justify-center bg-[#1C1C1C] overflow-hidden">
      {/* Background image with cinematic dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/events/hero.jpg"
          alt="Luxury outdoor picnic event setup in Las Vegas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 transition-transform duration-10000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/60 to-[#1C1C1C]/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <span className="text-[#C9A96E] text-[12px] md:text-[13px] uppercase tracking-[0.28em] font-semibold flex items-center gap-2">
            <Sparkles size={14} className="text-[#C9A96E]" />
            Mother of Flower · Las Vegas
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[#FDFDFD] text-[clamp(2.4rem,5.5vw,4.4rem)] font-normal leading-[1.08] tracking-tight max-w-4xl"
        >
          Luxury Pop-Up Picnics &amp; Bespoke Events
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#E5E2DB] text-[15px] md:text-[17px] font-normal leading-relaxed max-w-2xl text-balance"
        >
          Signature luxury picnic setups for proposals, birthdays, anniversaries, and corporate celebrations at iconic scenic locations across Las Vegas &amp; Lake Mead.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
        >
          <a
            href="#packages"
            className="w-full sm:w-auto px-9 py-4 bg-[#C9A96E] text-[#1C1C1C] text-[13px] font-bold uppercase tracking-[0.1em] rounded-[2px] hover:bg-[#FDFDFD] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg no-underline"
          >
            <Calendar size={15} />
            Explore Packages
          </a>
          <button
            onClick={onOpenCall}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#FDFDFD]/80 text-[#FDFDFD] text-[13px] font-bold uppercase tracking-[0.1em] rounded-[2px] hover:bg-[#FDFDFD] hover:text-[#1C1C1C] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-10 mt-6 border-t border-white/15 w-full text-left"
        >
          {[
            { label: 'Iconic Locations', desc: 'Lake Mead, Strip View, Private Suites' },
            { label: 'Full Luxury Styling', desc: 'Rugs, cushions, glassware & candlelight' },
            { label: 'Signature Florals', desc: 'Handcrafted fresh floral artistry' },
            { label: 'Turnkey Service', desc: 'Delivery, full setup & discreet cleanup' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              <span className="text-[#C9A96E] text-[12px] font-bold uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-[#C5C2BA] text-[12px] leading-snug">
                {item.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
