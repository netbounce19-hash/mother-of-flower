'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { site } from '@/lib/site';

export default function ContactHero() {
  return (
    <section className="relative w-full bg-[#FDFDFD] overflow-hidden">

      {/* ═══════════════════════════════════════
          WORDMARK — full-width band
      ═══════════════════════════════════════ */}
      <div className="relative w-full bg-[#FDFDFD] pt-[100px] md:pt-[140px] pb-10 md:pb-14">
        {/* subtle radial glow at top */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 40% at 50% 0%, rgba(201,169,110,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 px-6">
          <p className="text-[#C9A96E] text-[10px] uppercase tracking-[0.35em] font-semibold">
            Las Vegas
          </p>

          {/* Wordmark image — centered block, max width 740px */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', maxWidth: '740px' }}
          >
            <Image
              src="/images/contact-hero-wordmark-light.webp"
              alt="Mother of Flower"
              width={740}
              height={740}
              sizes="(max-width: 780px) 100vw, 740px"
              className="w-full h-auto object-contain"
              preload
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-8 h-[1.5px] bg-[#C9A96E]"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CONTACT GRID — contained
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1100px] mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D9] border border-[#E8E2D9] rounded-[3px] overflow-hidden">
          {[
            {
              icon: <MapPin strokeWidth={1.4} size={18} />,
              label: 'Address',
              content: (
                <span>{site.address.line1},<br />{site.address.line2}</span>
              ),
            },
            {
              icon: <Clock strokeWidth={1.4} size={18} />,
              label: 'Hours',
              content: (
                <span>Mon–Sun:<br />10:00 AM – 7:00 PM</span>
              ),
            },
            {
              icon: <Phone strokeWidth={1.4} size={18} />,
              label: 'Phone',
              content: (
                <a href={site.phone.href} className="hover:text-[#C9A96E] transition-colors duration-300">
                  {site.phone.display}
                </a>
              ),
            },
            {
              icon: <Mail strokeWidth={1.4} size={18} />,
              label: 'Email',
              content: (
                <a href={`mailto:${site.email}`} className="hover:text-[#C9A96E] transition-colors duration-300 break-all">
                  {site.email}
                </a>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 items-center text-center py-7 px-5 bg-[#FDFDFD] hover:bg-[#FAF8F4] transition-colors duration-500"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#C9A96E]/10 text-[#C9A96E]">
                {item.icon}
              </div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A8A8A]">
                {item.label}
              </h3>
              <p className="text-[#333333] text-[13px] leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          QUICK CONTACT BAR
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1100px] mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[#E8E2D9] mt-0"
      >
        <p className="text-[#8A8A8A] text-[12px] tracking-wide">
          Check bouquet availability by phone:
        </p>
        <div className="flex gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1C1C] text-[#FDFDFD] text-[11px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#C9A96E] transition-colors duration-300"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C9A96E]/40 text-[#1C1C1C] text-[11px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#C9A96E]/10 transition-colors duration-300"
          >
            <MessageCircle size={13} /> Telegram
          </a>
        </div>
      </motion.div>

    </section>
  );
}
