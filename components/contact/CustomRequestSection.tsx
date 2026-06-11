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
            className="flex flex-col justify-center"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] tracking-[0.15em] uppercase text-[#5A5A5A] font-medium">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] tracking-[0.15em] uppercase text-[#5A5A5A] font-medium">Phone or Email</label>
                  <input 
                    type="text" 
                    placeholder="contact@example.com" 
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] tracking-[0.15em] uppercase text-[#5A5A5A] font-medium">Inquiry Type</label>
                <div className="relative">
                  <select className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] appearance-none focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors cursor-pointer rounded-none">
                    <option value="" disabled selected hidden className="text-[#A3A3A3]">Select type...</option>
                    <option>Custom Bouquet</option>
                    <option>Wedding & Bridal</option>
                    <option>Corporate Event</option>
                    <option>Residential / Hotel Styling</option>
                    <option>Other</option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none text-[10px]">▼</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] tracking-[0.15em] uppercase text-[#5A5A5A] font-medium">Date of Event / Delivery</label>
                  <input 
                    type="text" 
                    placeholder="DD.MM.YYYY"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] tracking-[0.15em] uppercase text-[#5A5A5A] font-medium">Estimated Budget</label>
                  <div className="relative">
                    <select className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] appearance-none focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors cursor-pointer rounded-none">
                      <option value="" disabled selected hidden className="text-[#A3A3A3]">Select budget...</option>
                      <option>$100 - $300</option>
                      <option>$300 - $1000</option>
                      <option>$1000 - $5000</option>
                      <option>$5000+</option>
                    </select>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none text-[10px]">▼</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] tracking-[0.15em] uppercase text-[#5A5A5A] font-medium">Your Vision / Details</label>
                <textarea 
                  placeholder="Tell us about the occasion, preferred colors, or specific flowers..." 
                  rows={3}
                  className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors resize-none rounded-none"
                />
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center transition-all duration-300 w-fit"
                  style={{ 
                    backgroundColor: '#1C1C1C', 
                    color: '#FDFDFD',
                    padding: '16px 48px',
                    fontSize: '11px',
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
                  Submit Request
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
