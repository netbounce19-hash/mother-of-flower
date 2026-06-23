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

export default function PartnershipRequestForm() {
  return (
    <section id="partnership-request" className="w-full bg-[#FAF9F6]" style={{ padding: '120px 5vw' }}>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col text-center mb-14 gap-4"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
            Become a Partner
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-sans text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold uppercase tracking-tight text-[#1C1C1C]">
            Let's discuss the details
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#8A8A8A] text-[14px] font-medium max-w-xl mx-auto leading-relaxed">
            Fill out the contact form and we'll get back within one business day to discuss collaboration opportunities.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          
          {/* Main Partnership Request Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="lg:col-span-3 flex flex-col gap-8 bg-[#FDFDFD] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2px]"
          >
            <h3 className="text-[18px] font-bold uppercase tracking-wide text-[#1C1C1C] border-b border-[#E5E5E5] pb-4">
              Submit a Request
            </h3>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="Wynn Resort / Freelance Planner" 
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Contact Person</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="contact@example.com" 
                    className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold tracking-wide uppercase text-[#5A5A5A]">Project Details / Venue Description</label>
                <textarea 
                  placeholder="Tell us about your venue, typical volume, or specific event needs..." 
                  rows={4}
                  className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#1C1C1C] hover:border-[#8A8A8A] transition-colors resize-none rounded-none"
                />
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center transition-all duration-300 w-full md:w-fit"
                  style={{ 
                    backgroundColor: '#1C1C1C', 
                    color: '#FDFDFD',
                    padding: '16px 48px',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontWeight: 700
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

          {/* Quick Call Back Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="lg:col-span-2 flex flex-col gap-8 bg-[#1C1C1C] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-[2px]"
          >
            <h3 className="text-[18px] font-bold uppercase tracking-wide text-[#FDFDFD] border-b border-[#333333] pb-4">
              Request a Call
            </h3>
            <p className="text-[#A3A3A3] text-[14px] leading-relaxed">
              In a hurry? Leave your number and our team will call you back to discuss the details shortly.
            </p>

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold tracking-wide uppercase text-[#8A8A8A]">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Jane" 
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-[14px] text-[#FDFDFD] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#FDFDFD] hover:border-[#8A8A8A] transition-colors rounded-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold tracking-wide uppercase text-[#8A8A8A]">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-[14px] text-[#FDFDFD] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#FDFDFD] hover:border-[#8A8A8A] transition-colors rounded-none"
                />
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center transition-all duration-300 w-full"
                  style={{ 
                    backgroundColor: '#FDFDFD', 
                    color: '#1C1C1C',
                    padding: '16px 48px',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontWeight: 700
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C9A96E';
                    e.currentTarget.style.color = '#FDFDFD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FDFDFD';
                    e.currentTarget.style.color = '#1C1C1C';
                  }}
                >
                  We Will Call You Back
                </button>
                <p className="text-[10px] text-[#5A5A5A] leading-relaxed mt-2 text-center">
                  By clicking the button, I give my consent to the processing of my personal data.
                </p>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
