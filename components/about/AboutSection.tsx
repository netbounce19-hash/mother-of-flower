'use client';

import { motion, Variants } from 'framer-motion';

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
      <div className="w-full" style={{ padding: '120px 5vw 120px 10vw' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ maxWidth: 1200, gap: '8vw', margin: '0 auto' }}>
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
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors pb-1 border-b border-[#8A8A8A]/30 hover:border-[#1C1C1C]"
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
              <h2 className="font-sans text-[14px] tracking-[0.18em] uppercase" style={{ color: '#1C1C1C' }}>Premium Quality</h2>
              <p className="text-[15px] leading-[1.8]" style={{ color: '#5A5A5A' }}>
                We source event-grade blooms daily and handcraft every piece in our Las Vegas studio. Temperature-controlled hydration, clean mechanics, and recyclable wrap keep your flowers pristine from workbench to doorstep.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h2 className="font-sans text-[14px] tracking-[0.18em] uppercase" style={{ color: '#1C1C1C' }}>Delivery & Setup</h2>
              <p className="text-[15px] leading-[1.8]" style={{ color: '#5A5A5A' }}>
                Same-day, hand delivery with precise 2-hour windows. We coordinate with concierge, can place arrangements in-room, and include a care card. For bouquets, use a clean vase with cool water. See our simple care guide or message us—we'll help with everything.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h2 className="font-sans text-[14px] tracking-[0.18em] uppercase" style={{ color: '#1C1C1C' }}>Handcrafted Florals,<br/>Living Stories</h2>
              <p className="text-[15px] leading-[1.8]" style={{ color: '#5A5A5A' }}>
                Our designer florists build each arrangement by hand in our Las Vegas studio. We compose color, texture, and movement so your bouquet feels personal—more than flowers, a story for your moment.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h2 className="font-sans text-[14px] tracking-[0.18em] uppercase" style={{ color: '#1C1C1C' }}>Sustainability & Safety</h2>
              <p className="text-[15px] leading-[1.8] mb-2" style={{ color: '#5A5A5A' }}>
                Responsibly sourced blooms, recyclable wrapping, and water-based care. Same-day, temperature-conscious hand delivery for homes, offices, and hotel suites. Need child- or pet-considerate florals? Tell us—we'll tailor the selection.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase border-b pb-1 w-fit hover:opacity-50 transition-opacity duration-300"
                style={{ color: '#1C1C1C', borderColor: '#1C1C1C', fontWeight: 500 }}
              >
                Get Advice →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Block 3: Partnerships & Collaborations (Cream Theme) */}
      <div className="w-full text-[#1C1C1C]" style={{ backgroundColor: '#F7F5F2', padding: '120px 5vw' }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1100, gap: '100px' }}>
          
          {/* Section 1: Intro & Hero */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-12"
          >
            <motion.h2 
              variants={fadeUp} 
              className="font-sans tracking-[0.15em] uppercase text-center"
              style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400 }}
            >
              Partner with Mother of Flower
            </motion.h2>
            
            {/* Hero Image */}
            <motion.div variants={fadeUp} style={{ width: '100%', aspectRatio: '21/9', overflow: 'hidden', backgroundColor: '#E5E5E5' }}>
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop" 
                alt="Event table setup in nature" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </motion.div>

            {/* Intro Text Grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 mt-4">
              <div className="flex flex-col gap-6">
                <p className="text-[16px] leading-[1.8] text-[#5A5A5A]">
                  We collaborate with hotels, resorts, restaurants, event planners, realtors, and design studios across Las Vegas. From one-off moments to ongoing programs, we make flowers the easiest win for your guest experience.
                </p>
                <p className="text-[16px] leading-[1.8] text-[#5A5A5A]">
                  Our designs feel at home in private residences and commercial spaces alike: lobbies, suites and VIP lounges on The Strip, fine-dining tables, retail boutiques, salons, galleries, offices, and model homes.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[16px] leading-[1.8] text-[#5A5A5A]">
                  Flowers aren't background—they're part of the story. Thoughtful arrangements spark the kind of moments guests remember (and share).
                </p>
                <p className="text-[16px] leading-[1.8] text-[#5A5A5A]">
                  Let's create spaces people want to return to. Tell us about your venue—same-day support available citywide (order by 2 PM).
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Section 2: What partners get */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              style={{ width: '100%', maxWidth: '460px', margin: '0 auto' }}
              className="order-2 md:order-1"
            >
              <div className="bg-[#FDFDFD] p-[6%] pb-[20%] shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500 rounded-[2px]">
                <img 
                  src="https://images.unsplash.com/photo-1563241595-cecaeb64ec39?q=80&w=800&auto=format&fit=crop" 
                  alt="Pink flowers on chair" 
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col gap-10 order-1 md:order-2"
            >
              <motion.h3 variants={fadeUp} className="font-sans text-[16px] tracking-[0.2em] uppercase text-[#1C1C1C]">
                What our partners get:
              </motion.h3>
              
              <motion.ul variants={fadeUp} className="flex flex-col gap-6 text-[16px] text-[#5A5A5A]">
                <li className="flex items-start gap-4">
                  <span className="text-[#C9A96E] mt-1 text-[12px]">✦</span>
                  <span className="leading-[1.6]">Preferred commercial terms</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#C9A96E] mt-1 text-[12px]">✦</span>
                  <span className="leading-[1.6]">Complimentary samples</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#C9A96E] mt-1 text-[12px]">✦</span>
                  <span className="leading-[1.6]">Flexible adaptation to your project — palette tweaks, scaling, composition updates</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#C9A96E] mt-1 text-[12px]">✦</span>
                  <span className="leading-[1.6]">Support at every stage: from selection to technical consultation</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#C9A96E] mt-1 text-[12px]">✦</span>
                  <span className="leading-[1.6]">Custom ideas within the Mother of Flower aesthetic</span>
                </li>
              </motion.ul>

              <motion.div variants={fadeUp} className="pt-10 border-t border-[#E5E5E5] flex flex-col gap-6">
                <p className="text-[15px] text-[#8A8A8A] leading-[1.6]">
                  To become our partner, fill out the contact form. We'll get back within one business day to discuss collaboration opportunities.
                </p>
                <a
                  href="#custom-request"
                  className="inline-flex items-center justify-center transition-all duration-300 w-fit"
                  style={{ 
                    backgroundColor: '#1C1C1C', 
                    color: '#FDFDFD',
                    padding: '18px 48px',
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C9A96E';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1C1C1C';
                  }}
                >
                  Become a Partner →
                </a>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
