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

export default function LocationSection() {
  return (
    <section id="locations" style={{ width: '100%', backgroundColor: '#FDFDFD', padding: '120px 5vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Top Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col gap-6 mb-16"
        >
          <motion.h2 
            variants={fadeUp} 
            className="text-[12px] tracking-[0.2em] uppercase text-[#1C1C1C] font-medium"
          >
            Delivery & Location
          </motion.h2>
          <motion.div variants={fadeUp} className="w-8 h-[1px] bg-[#E5E5E5] mb-2" />
          <motion.div variants={fadeUp} className="flex flex-col gap-2 text-[15px] text-[#5A5A5A] max-w-2xl">
            <p>We're an online flower shop with physical locations available for pickup and same-day delivery.</p>
            <p>We deliver flowers to most areas of Las Vegas and Henderson within the hour or same-day if flowers are in stock.</p>
          </motion.div>
        </motion.div>

        {/* Location Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          
          {/* Details (Left Col) */}
          <motion.div 
            variants={fadeUp} 
            className="lg:col-span-4 flex flex-col items-center text-center p-8 bg-[#FAF9F6] border border-[#E5E5E5]"
          >
            <h3 className="text-[14px] tracking-[0.2em] uppercase text-[#1C1C1C] font-medium mb-6">Henderson</h3>
            <div className="w-6 h-[1px] bg-[#D1D1D1] mb-8" />
            
            <div className="flex flex-col gap-6 text-[14px] text-[#5A5A5A] leading-relaxed mb-10">
              <p>
                7710 Eastgate Rd<br/>
                Henderson, NV 89011
              </p>
              <p>
                Mon - Sat, 9am - 7pm<br/>
                Sun, 9am - 5pm
              </p>
              <p>
                +1 (702) 555-0198
              </p>
            </div>

            <a 
              href="https://maps.google.com/?q=7710+Eastgate+Rd,+Henderson,+NV+89011"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-all duration-300 w-full"
              style={{ 
                backgroundColor: '#1C1C1C', 
                color: '#FDFDFD',
                padding: '16px 32px',
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
              Directions
            </a>
          </motion.div>

          {/* Map Widget (Right Col) */}
          <motion.div 
            variants={fadeUp} 
            className="lg:col-span-8 w-full h-[450px] bg-[#E5E5E5] relative"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.7905878466657!2d-115.02534572412854!3d36.02517887247781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8d11c80f4886f%3A0xcb06526fc1ff725!2s7710%20Eastgate%20Rd%2C%20Henderson%2C%20NV%2089011!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
          </motion.div>

        </motion.div>

        {/* Bottom Contact Note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-16 text-[14px] text-[#5A5A5A] max-w-3xl"
        >
          <p className="mb-4">
            We're always here to guide you through ordering process or help you to make a decision on what composition would be the best fit for your occasion. Don't be shy and reach out!
          </p>
          <p className="text-[12px] tracking-[0.1em] uppercase text-[#1C1C1C] font-medium mb-1">Contacts</p>
          <a href="mailto:orders@motherofflower.com" className="text-[#C9A96E] hover:text-[#1C1C1C] transition-colors">
            orders@motherofflower.com
          </a>
        </motion.div>

      </div>
    </section>
  );
}
