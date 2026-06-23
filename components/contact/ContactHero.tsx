'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="relative w-full bg-[#1C1C1C] pt-[120px] pb-[80px] md:pt-[160px] md:pb-[100px] overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] grain-overlay pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-[5vw] flex flex-col gap-14 md:gap-20">

        {/* Hero wordmark image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow label */}
          <p className="text-[#C9A96E] text-[11px] uppercase tracking-[0.25em] font-semibold">
            Las Vegas
          </p>

          {/* Textured image replacing the h1 heading */}
          <div className="w-full max-w-[560px] mx-auto">
            <Image
              src="/images/contact-hero-wordmark.png"
              alt="Mother of Flower"
              width={560}
              height={560}
              className="w-full h-auto object-contain opacity-95 mix-blend-normal"
              priority
            />
          </div>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(253,253,253,0.06)] border border-[rgba(253,253,253,0.06)] rounded-[3px] overflow-hidden"
        >
          {[
            {
              icon: <MapPin strokeWidth={1.5} size={20} />,
              label: 'Address',
              content: (
                <span>
                  7710 Eastgate Rd,<br />Henderson, NV 89011
                </span>
              ),
            },
            {
              icon: <Clock strokeWidth={1.5} size={20} />,
              label: 'Hours',
              content: (
                <span>
                  Mon–Sun:<br />10:00 AM – 7:00 PM
                </span>
              ),
            },
            {
              icon: <Phone strokeWidth={1.5} size={20} />,
              label: 'Phone',
              content: (
                <a
                  href="tel:+17252242454"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  +1 725 224 2454
                </a>
              ),
            },
            {
              icon: <Mail strokeWidth={1.5} size={20} />,
              label: 'Email',
              content: (
                <a
                  href="mailto:info@motherofflower.com"
                  className="hover:text-[#C9A96E] transition-colors break-all"
                >
                  info@motherofflower.com
                </a>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 items-center text-center p-6 md:p-8 bg-[#1C1C1C] hover:bg-[rgba(201,169,110,0.05)] transition-colors duration-500"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#C9A96E]">
                {item.icon}
              </div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FDFDFD]/60">
                {item.label}
              </h3>
              <p className="text-[#A3A3A3] text-[14px] leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Quick Contact Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2 border-t border-[rgba(253,253,253,0.08)]"
        >
          <p className="text-[#6B6B6B] text-[13px] tracking-wide">
            Check bouquet availability by phone:
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FDFDFD] text-[#1C1C1C] text-[11px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#C9A96E] hover:text-[#FDFDFD] transition-colors duration-300"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[rgba(253,253,253,0.15)] text-[#FDFDFD] text-[11px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[rgba(253,253,253,0.08)] transition-colors duration-300"
            >
              <MessageCircle size={14} /> Telegram
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
