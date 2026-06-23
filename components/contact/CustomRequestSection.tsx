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
    <section
      id="custom-request"
      className="w-full bg-[#FAF9F6]"
      style={{ padding: '100px 5vw' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-28 items-start">

          {/* Left Column: Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A]">
                Bespoke Services
              </p>
              <h2 className="font-sans text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#1C1C1C]">
                Custom Design &<br />Event Styling
              </h2>
              <p className="text-[15px] font-medium leading-[1.75] text-[#555555] max-w-[440px]">
                From personalized signature bouquets to full-scale floral architecture for weddings, corporate galas, and exclusive private events in Las Vegas. Share your vision with our master florists, and we will bring it to life with the finest event-grade blooms.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A8A8A] mb-1">
                What we offer
              </p>
              <ul className="flex flex-col gap-2.5 text-[14px] font-medium text-[#444444] leading-relaxed">
                <li className="flex items-center gap-3">
                  <span className="text-[#C9A96E] text-[10px]">✦</span>
                  Tailored Personal Bouquets
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C9A96E] text-[10px]">✦</span>
                  Wedding &amp; Engagement Florals
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C9A96E] text-[10px]">✦</span>
                  Corporate Event &amp; Gala Styling
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C9A96E] text-[10px]">✦</span>
                  Hotel Suite &amp; Residential Installations
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col gap-6"
          >
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8A8A8A]">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8A8A8A]">Phone or Email</label>
                  <input
                    type="text"
                    placeholder="contact@example.com"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8A8A8A]">Inquiry Type</label>
                <div className="relative">
                  <select className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] appearance-none focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors cursor-pointer rounded-none">
                    <option value="" disabled selected hidden>Select type...</option>
                    <option>Custom Bouquet</option>
                    <option>Wedding &amp; Bridal</option>
                    <option>Corporate Event</option>
                    <option>Residential / Hotel Styling</option>
                    <option>Other</option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none text-[9px]">▼</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8A8A8A]">Date of Event</label>
                  <input
                    type="text"
                    placeholder="DD.MM.YYYY"
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8A8A8A]">Estimated Budget</label>
                  <div className="relative">
                    <select className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] appearance-none focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors cursor-pointer rounded-none">
                      <option value="" disabled selected hidden>Select budget...</option>
                      <option>$100 – $300</option>
                      <option>$300 – $1,000</option>
                      <option>$1,000 – $5,000</option>
                      <option>$5,000+</option>
                    </select>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none text-[9px]">▼</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8A8A8A]">Your Vision / Details</label>
                <textarea
                  placeholder="Tell us about the occasion, preferred colors, or specific flowers..."
                  rows={3}
                  className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors resize-none rounded-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center bg-[#1C1C1C] text-[#FDFDFD] text-[11px] font-bold uppercase tracking-[0.1em] px-10 py-3.5 rounded-[2px] hover:bg-[#C9A96E] transition-colors duration-300"
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
