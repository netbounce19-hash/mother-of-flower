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
    <section id="locations" className="w-full bg-[#FAF9F6]" style={{ padding: '0 5vw 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Location Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-[#FDFDFD] border border-[#E8E8E8] rounded-[2px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">

            {/* Details (Left) */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-7 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#EEEEEE]"
            >
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Address</p>
                <p className="text-[14px] font-medium text-[#1C1C1C] leading-relaxed">
                  7710 Eastgate Rd<br />Henderson, NV 89011
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Hours</p>
                <p className="text-[14px] font-medium text-[#1C1C1C] leading-relaxed">
                  Mon – Sat, 9am – 7pm<br />Sun, 9am – 5pm
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Contact</p>
                <p className="text-[14px] font-medium text-[#1C1C1C]">+1 (702) 555-0198</p>
                <a
                  href="mailto:orders@motherofflower.com"
                  className="text-[14px] font-medium text-[#8A8A8A] hover:text-[#C9A96E] transition-colors"
                >
                  orders@motherofflower.com
                </a>
              </div>

              <a
                href="https://maps.google.com/?q=7710+Eastgate+Rd,+Henderson,+NV+89011"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-2 border border-[#1C1C1C] text-[#1C1C1C] text-[11px] font-bold uppercase tracking-[0.1em] px-7 py-3 rounded-[2px] hover:bg-[#1C1C1C] hover:text-[#FDFDFD] transition-colors duration-300 w-fit"
              >
                Get Directions
              </a>
            </motion.div>

            {/* Map (Right) */}
            <motion.div
              variants={fadeUp}
              className="w-full h-[320px] lg:h-[400px] relative"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.7905878466657!2d-115.02534572412854!3d36.02517887247781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8d11c80f4886f%3A0xcb06526fc1ff725!2s7710%20Eastgate%20Rd%2C%20Henderson%2C%20NV%2089011!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </motion.div>

          </div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-16 pt-10 border-t border-[#E8E8E8] text-center"
        >
          <p className="text-[13px] italic text-[#8A8A8A] max-w-2xl mx-auto leading-relaxed">
            "We're always here to guide you through the ordering process or help you to make a decision on what composition would be the best fit for your occasion. Don't be shy and reach out."
          </p>
        </motion.div>

      </div>
    </section>
  );
}
