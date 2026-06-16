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
    <section id="locations" style={{ width: '100%', backgroundColor: '#FAF9F6', padding: '40px 5vw 120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Location Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          
          {/* Details (Left Col) */}
          <motion.div 
            variants={fadeUp} 
            className="lg:col-span-4 flex flex-col items-start"
          >
            
            <div className="flex flex-col gap-5 text-[14px] text-[#5A5A5A] leading-relaxed mb-8">
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8A8A8A] font-medium mb-1">Address</p>
                <p className="text-[#1C1C1C]">7710 Eastgate Rd<br/>Henderson, NV 89011</p>
              </div>
              
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8A8A8A] font-medium mb-1">Hours</p>
                <p className="text-[#1C1C1C]">Mon - Sat, 9am - 7pm<br/>Sun, 9am - 5pm</p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8A8A8A] font-medium mb-1">Contact</p>
                <p className="text-[#1C1C1C]">+1 (702) 555-0198</p>
                <a href="mailto:orders@motherofflower.com" className="hover:text-[#C9A96E] transition-colors block">orders@motherofflower.com</a>
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
                border: '1px solid #D1D1D1',
                padding: '14px 40px',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 500
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1C1C1C';
                e.currentTarget.style.backgroundColor = '#1C1C1C';
                e.currentTarget.style.color = '#FDFDFD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D1D1D1';
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
            className="lg:col-span-8 w-full bg-[#FDFDFD] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2px]"
          >
            <div className="w-full h-[300px] md:h-[350px] bg-[#F7F5F2] relative overflow-hidden">
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
            </div>
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
