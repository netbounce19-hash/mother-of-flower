'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function PartnershipsContent() {
  return (
    <section className="w-full bg-[#FDFDFD] text-[#1C1C1C]" style={{ padding: '100px 5vw' }}>
      <div className="mx-auto flex flex-col" style={{ maxWidth: 1200, gap: '100px' }}>
        
        {/* Intro Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '6vw' }}
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <h2 className="font-sans text-[20px] md:text-[24px] font-bold uppercase tracking-wide">
              Who we collaborate with
            </h2>
            <p className="text-[15px] font-medium leading-[1.8] text-[#333333]">
              We collaborate with hotels, resorts, restaurants, event planners, realtors, and design studios across Las Vegas. From one-off moments to ongoing programs, we make flowers the easiest win for your guest experience.
            </p>
            <p className="text-[15px] font-medium leading-[1.8] text-[#333333]">
              Our designs feel at home in private residences and commercial spaces alike: lobbies, suites and VIP lounges on The Strip, fine-dining tables, retail boutiques, salons, galleries, offices, and model homes.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-6 md:mt-14">
            <p className="text-[15px] font-medium leading-[1.8] text-[#333333]">
              Flowers aren’t background—they’re part of the story. Thoughtful arrangements spark the kind of moments guests remember (and share). Let’s create spaces people want to return to.
            </p>
            <p className="text-[15px] font-medium leading-[1.8] text-[#333333]">
              Tell us about your venue—same-day support available citywide (order by 2 PM).
            </p>
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: '8vw' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="order-2 md:order-1"
          >
            <div className="bg-[#FAF9F6] p-[6%] shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500 rounded-[2px]">
              <Image
                src="/images/pink_flowers_chair.webp"
                alt="Pink flowers on chair"
                width={1024}
                height={1024}
                sizes="(max-width: 768px) 88vw, 500px"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
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
            <motion.h3 variants={fadeUp} className="font-sans text-[20px] font-bold tracking-wide uppercase text-[#1C1C1C]">
              What our partners get:
            </motion.h3>
            
            <motion.ul variants={fadeUp} className="flex flex-col gap-6 text-[15px] font-medium text-[#333333]">
              {[
                "Preferred commercial terms",
                "Complimentary samples",
                "Flexible adaptation to your project — palette tweaks, scaling, composition updates",
                "Support at every stage: from selection to technical consultation",
                "Custom ideas within the Mother of Flower aesthetic"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="text-[#C9A96E] mt-1 text-[12px]">✦</span>
                  <span className="leading-[1.6]">{item}</span>
                </li>
              ))}
            </motion.ul>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
