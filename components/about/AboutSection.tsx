'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function AboutSection() {
  return (
    <section id="about" className="w-full flex flex-col bg-[#FDFDFD]">
      
      {/* Block 1: Quality & Delivery */}
      <div className="w-full site-section">
        <div className="site-container grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-[8vw]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative bg-[#FDFDFD] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500 rounded-[2px]"
            style={{ width: '100%', maxWidth: '460px', margin: '0 auto', padding: '6%', paddingBottom: '20%' }}
          >
            <motion.video
              src="/videos/about-reel.mov.mov"
              autoPlay
              loop
              muted
              playsInline
              initial={{ filter: 'grayscale(100%)' }}
              whileHover={{ filter: 'grayscale(0%)' }}
              transition={{ duration: 0.6 }}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', cursor: 'pointer', borderRadius: '1px' }}
            />
            
            {/* Polaroid caption / button */}
            <div 
              className="absolute bottom-0 left-0 w-full flex items-center justify-center" 
              style={{ height: '14%' }}
            >
              <a 
                href="https://www.instagram.com/mother_of_flower/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors pb-1 border-b border-[#8A8A8A]/30 hover:border-[#1C1C1C]"
              >
                Follow us on Instagram ↗
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col"
            style={{ gap: '48px' }}
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h2 className="font-sans text-[14px] font-bold tracking-wide uppercase" style={{ color: '#1C1C1C' }}>Premium Quality</h2>
              <p className="text-[15px] font-medium leading-[1.8] text-[#333333]">
                We source event-grade blooms daily and handcraft every piece in our Las Vegas studio. Temperature-controlled hydration, clean mechanics, and recyclable wrap keep your flowers pristine from workbench to doorstep.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h2 className="font-sans text-[14px] font-bold tracking-wide uppercase" style={{ color: '#1C1C1C' }}>Delivery & Setup</h2>
              <p className="text-[15px] font-medium leading-[1.8] text-[#333333]">
                Same-day, hand delivery with precise 2-hour windows. We coordinate with concierge, can place arrangements in-room, and include a care card. For bouquets, use a clean vase with cool water. See our simple care guide or message us—we&apos;ll help with everything.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h2 className="font-sans text-[14px] font-bold tracking-wide uppercase" style={{ color: '#1C1C1C' }}>Handcrafted Florals,<br/>Living Stories</h2>
              <p className="text-[15px] font-medium leading-[1.8] text-[#333333]">
                Our designer florists build each arrangement by hand in our Las Vegas studio. We compose color, texture, and movement so your bouquet feels personal—more than flowers, a story for your moment.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h2 className="font-sans text-[14px] font-bold tracking-wide uppercase" style={{ color: '#1C1C1C' }}>Sustainability & Safety</h2>
              <p className="text-[15px] font-medium leading-[1.8] mb-2 text-[#333333]">
                Responsibly sourced blooms, recyclable wrapping, and water-based care. Same-day, temperature-conscious hand delivery for homes, offices, and hotel suites. Need child- or pet-considerate florals? Tell us—we&apos;ll tailor the selection.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[13px] tracking-wide uppercase font-bold border-b pb-1 w-fit hover:opacity-50 transition-opacity duration-300"
                style={{ color: '#1C1C1C', borderColor: '#1C1C1C' }}
              >
                Get Advice →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/*
        The full partnerships pitch (intro, hero image, "What our partners
        get") used to be repeated here verbatim from /sotrud — the same five
        bullet points word for word, which Google reads as duplicate content.
        The canonical version now lives only on /sotrud; this band keeps the
        route discoverable from the homepage.
      */}
      <div className="w-full text-[#1C1C1C] site-section" style={{ backgroundColor: '#F7F5F2' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="site-container flex flex-col items-center text-center gap-6"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E]">
            Partnerships
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif leading-[1.1]"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 400 }}
          >
            Partner with Mother of Flower
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[15px] font-medium leading-[1.8] text-[#333333] max-w-[560px]">
            Hotels, resorts, restaurants, event planners and design studios across
            Las Vegas work with us on preferred terms, with a dedicated floral
            concierge and same-day support.
          </motion.p>

          <motion.div variants={fadeUp} className="pt-2">
            <Link
              href="/sotrud"
              className="inline-flex items-center justify-center bg-[#1C1C1C] text-[#FDFDFD] text-[13px] font-bold uppercase tracking-[0.04em] px-12 py-[18px] rounded-[2px] no-underline hover:bg-[#C9A96E] focus-visible:bg-[#C9A96E] transition-colors duration-300"
            >
              Become a Partner →
            </Link>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
