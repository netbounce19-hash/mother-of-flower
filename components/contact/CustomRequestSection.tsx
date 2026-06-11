'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function CustomRequestSection() {
  return (
    <section id="custom-request" style={{ width: '100%', backgroundColor: '#FAF9F6', padding: '120px 5vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          
          {/* Left Column: Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col"
            style={{ gap: '32px' }}
          >
            <motion.div variants={fadeUp}>
              <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: 12, fontWeight: 500 }}>
                Bespoke Services
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  color: '#1C1C1C',
                  lineHeight: 1.1,
                  fontWeight: 400,
                  marginBottom: 24
                }}
              >
                Custom Design &<br/>Event Styling
              </h2>
              <p style={{ fontSize: 15, color: '#5A5A5A', lineHeight: 1.8, maxWidth: 460 }}>
                From personalized signature bouquets to full-scale floral architecture for weddings, corporate galas, and exclusive private events in Las Vegas. Share your vision with our master florists, and we will bring it to life with the finest event-grade blooms.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-6 mt-4">
              <div>
                <h3 className="text-[12px] tracking-[0.15em] uppercase text-[#1C1C1C] mb-2 font-medium">What we offer</h3>
                <ul className="text-[14px] text-[#5A5A5A] flex flex-col gap-2 leading-relaxed">
                  <li>✦ Tailored Personal Bouquets</li>
                  <li>✦ Wedding & Engagement Florals</li>
                  <li>✦ Corporate Event & Gala Styling</li>
                  <li>✦ Hotel Suite & Residential Installations</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="bg-[#FDFDFD] p-8 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.04)] rounded-[2px]"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A8A]">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    className="w-full bg-transparent border-b border-[#E5E5E5] pb-2 text-[14px] text-[#1C1C1C] placeholder:text-[#D1D1D1] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A8A]">Phone or Email</label>
                  <input 
                    type="text" 
                    placeholder="contact@example.com" 
                    className="w-full bg-transparent border-b border-[#E5E5E5] pb-2 text-[14px] text-[#1C1C1C] placeholder:text-[#D1D1D1] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A8A]">Inquiry Type</label>
                <div className="relative">
                  <select className="w-full bg-transparent border-b border-[#E5E5E5] pb-2 text-[14px] text-[#1C1C1C] appearance-none focus:outline-none focus:border-[#1C1C1C] transition-colors cursor-pointer rounded-none">
                    <option>Custom Bouquet</option>
                    <option>Wedding & Bridal</option>
                    <option>Corporate Event</option>
                    <option>Residential / Hotel Styling</option>
                    <option>Other</option>
                  </select>
                  <span className="absolute right-0 top-[2px] text-[#8A8A8A] pointer-events-none text-[10px]">▼</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A8A]">Date of Event / Delivery</label>
                  <input 
                    type="date" 
                    className="w-full bg-transparent border-b border-[#E5E5E5] pb-2 text-[14px] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A8A]">Estimated Budget</label>
                  <div className="relative">
                    <select className="w-full bg-transparent border-b border-[#E5E5E5] pb-2 text-[14px] text-[#1C1C1C] appearance-none focus:outline-none focus:border-[#1C1C1C] transition-colors cursor-pointer rounded-none">
                      <option>$100 - $300</option>
                      <option>$300 - $1000</option>
                      <option>$1000 - $5000</option>
                      <option>$5000+</option>
                    </select>
                    <span className="absolute right-0 top-[2px] text-[#8A8A8A] pointer-events-none text-[10px]">▼</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A8A]">Your Vision / Details</label>
                <textarea 
                  placeholder="Tell us about the occasion, preferred colors, or specific flowers..." 
                  rows={4}
                  className="w-full bg-transparent border-b border-[#E5E5E5] pb-2 text-[14px] text-[#1C1C1C] placeholder:text-[#D1D1D1] focus:outline-none focus:border-[#1C1C1C] transition-colors resize-none mt-1"
                />
              </div>

              <button
                type="button"
                className="mt-6 w-full py-4 text-[12px] tracking-[0.15em] uppercase text-[#FDFDFD] bg-[#1C1C1C] hover:bg-[#C9A96E] transition-colors duration-300"
              >
                Submit Request
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
