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
          className="flex flex-col items-center text-center gap-6 mb-20"
        >
          <motion.p variants={fadeUp} style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A8A8A' }}>
            Visit Us
          </motion.p>
          <motion.h2 
            variants={fadeUp} 
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#1C1C1C', lineHeight: 1.05 }}
          >
            Delivery & Location
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[14px] text-[#5A5A5A] max-w-2xl mt-4 leading-relaxed">
            We're an online flower shop with physical locations available for pickup and same-day delivery. We deliver flowers to most areas of Las Vegas and Henderson within the hour or same-day if flowers are in stock.
          </motion.p>
        </motion.div>

        {/* Location Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          
          {/* Details (Left Col) */}
          <motion.div 
            variants={fadeUp} 
            className="flex flex-col items-start"
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.5rem', color: '#1C1C1C', marginBottom: '1.5rem' }}>Henderson</h3>
            
            <div className="flex flex-col gap-8 text-[14px] text-[#5A5A5A] leading-relaxed mb-12">
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8A8A8A] font-medium mb-2">Address</p>
                <p className="text-[#1C1C1C]">7710 Eastgate Rd<br/>Henderson, NV 89011</p>
              </div>
              
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8A8A8A] font-medium mb-2">Hours</p>
                <p className="text-[#1C1C1C]">Mon - Sat, 9am - 7pm<br/>Sun, 9am - 5pm</p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8A8A8A] font-medium mb-2">Contact</p>
                <p className="text-[#1C1C1C]">+1 (702) 555-0198</p>
                <a href="mailto:orders@motherofflower.com" className="hover:text-[#C9A96E] transition-colors mt-1 block">orders@motherofflower.com</a>
              </div>
            </div>

            <a 
              href="https://maps.google.com/?q=7710+Eastgate+Rd,+Henderson,+NV+89011"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-all duration-300 w-fit"
              style={{ 
                backgroundColor: 'transparent', 
                color: '#1C1C1C',
                border: '1px solid #1C1C1C',
                padding: '16px 48px',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 500
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1C1C1C';
                e.currentTarget.style.color = '#FDFDFD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1C1C1C';
              }}
            >
              Get Directions
            </a>
          </motion.div>

          {/* Map Widget (Right Col) */}
          <motion.div 
            variants={fadeUp} 
            className="w-full aspect-square md:aspect-[4/5] bg-[#F7F5F2] relative overflow-hidden"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.7905878466657!2d-115.02534572412854!3d36.02517887247781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8d11c80f4886f%3A0xcb06526fc1ff725!2s7710%20Eastgate%20Rd%2C%20Henderson%2C%20NV%2089011!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale opacity-80 mix-blend-multiply hover:grayscale-0 hover:opacity-100 hover:mix-blend-normal transition-all duration-700 object-cover"
            />
          </motion.div>

        </motion.div>

        {/* Bottom Contact Note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-24 pt-12 border-t border-[#E5E5E5] text-center"
        >
          <p className="text-[13px] text-[#8A8A8A] max-w-2xl mx-auto italic font-serif">
            "We're always here to guide you through the ordering process or help you to make a decision on what composition would be the best fit for your occasion. Don't be shy and reach out."
          </p>
        </motion.div>

      </div>
    </section>
  );
}
