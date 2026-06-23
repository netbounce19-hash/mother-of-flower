'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="relative w-full bg-[#1C1C1C] pt-[140px] pb-[80px] md:pt-[180px] md:pb-[120px] overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(201,169,110,0.4) 0%, transparent 60%)' }} />
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-[5vw] flex flex-col gap-16 md:gap-24">
        
        {/* Title */}
        <div className="flex flex-col gap-4 text-center items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#C9A96E] text-[12px] md:text-[14px] uppercase tracking-[0.2em] font-bold"
          >
            Contacts
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#FDFDFD] font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight uppercase max-w-4xl"
          >
            Welcome to Mother of Flower
          </motion.h1>
        </div>

        {/* Contact Info Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {/* Address */}
          <div className="flex flex-col gap-4 items-center text-center p-8 border border-[rgba(253,253,253,0.1)] rounded-[2px] backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#C9A96E]/20 text-[#C9A96E] mb-2">
              <MapPin strokeWidth={1.5} size={24} />
            </div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#FDFDFD]">Registered Address</h3>
            <p className="text-[#A3A3A3] text-[15px] leading-relaxed">
              7710 Eastgate Rd,<br/>Henderson, NV 89011
            </p>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4 items-center text-center p-8 border border-[rgba(253,253,253,0.1)] rounded-[2px] backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#C9A96E]/20 text-[#C9A96E] mb-2">
              <Clock strokeWidth={1.5} size={24} />
            </div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#FDFDFD]">Working Hours</h3>
            <p className="text-[#A3A3A3] text-[15px] leading-relaxed">
              Mon–Sun:<br/>10:00 AM – 7:00 PM
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-4 items-center text-center p-8 border border-[rgba(253,253,253,0.1)] rounded-[2px] backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#C9A96E]/20 text-[#C9A96E] mb-2">
              <Phone strokeWidth={1.5} size={24} />
            </div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#FDFDFD]">Phone</h3>
            <a href="tel:+17252242454" className="text-[#A3A3A3] text-[15px] leading-relaxed hover:text-[#C9A96E] transition-colors">
              +1 725 224 2454
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-4 items-center text-center p-8 border border-[rgba(253,253,253,0.1)] rounded-[2px] backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#C9A96E]/20 text-[#C9A96E] mb-2">
              <Mail strokeWidth={1.5} size={24} />
            </div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#FDFDFD]">Email</h3>
            <a href="mailto:info@motherofflower.com" className="text-[#A3A3A3] text-[15px] leading-relaxed hover:text-[#C9A96E] transition-colors">
              info@motherofflower.com
            </a>
          </div>

        </motion.div>

        {/* Quick Contact Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12 border-t border-[rgba(253,253,253,0.1)]"
        >
          <p className="text-[#A3A3A3] text-[15px]">Please check bouquet availability by phone:</p>
          <div className="flex gap-4">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FDFDFD] text-[#1C1C1C] text-[12px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[#C9A96E] hover:text-[#FDFDFD] transition-colors duration-300"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(253,253,253,0.2)] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-wider rounded-[2px] hover:bg-[rgba(253,253,253,0.1)] transition-colors duration-300"
            >
              <MessageCircle size={16} /> Telegram
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
