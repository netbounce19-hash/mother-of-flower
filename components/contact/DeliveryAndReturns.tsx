'use client';

import { motion, Variants } from 'framer-motion';
import { site } from '@/lib/site';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function DeliveryAndReturns() {
  return (
    <section id="delivery" className="w-full bg-[#FDFDFD] py-[80px] md:py-[100px] border-t border-[#E8E2D9] scroll-mt-[72px]">
      <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24"
        >

          {/* ── Delivery ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <p className="text-[#C9A96E] text-[11px] font-semibold uppercase tracking-[0.25em]">
                Logistics
              </p>
              <h2 className="text-[#1C1C1C] text-[20px] font-bold tracking-wide uppercase">
                Delivery
              </h2>
              <div className="w-6 h-[1.5px] bg-[#C9A96E]" />
            </div>
            <div className="flex flex-col gap-5 text-[#444444] text-[14px] leading-[1.85]">
              <p>
                Mother of Flower prepares every bouquet fresh and carefully packages it to ensure it reaches you in perfect condition. All arrangements are safely placed in protective packaging designed to preserve the flowers during transportation.
              </p>
              <p>
                We offer delivery across Las Vegas and nearby areas. Delivery cost depends on your location and is calculated automatically at checkout. Same-day delivery is available for orders placed before the daily cut-off time.
              </p>
              <p>
                You may also choose store pickup from our Henderson boutique. Your bouquet will be ready at the selected time and handed to you with care.
              </p>
            </div>
          </motion.div>

          {/* ── Returns ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <p className="text-[#C9A96E] text-[11px] font-semibold uppercase tracking-[0.25em]">
                Policy
              </p>
              <h2 className="text-[#1C1C1C] text-[20px] font-bold tracking-wide uppercase">
                Returns
              </h2>
              <div className="w-6 h-[1.5px] bg-[#C9A96E]" />
            </div>
            <div className="flex flex-col gap-5 text-[#444444] text-[14px] leading-[1.85]">
              <p>
                All Mother of Flower bouquets are handcrafted to order using fresh, natural flowers. Because floral compositions are perishable and individually prepared, returns are only possible in the event of confirmed product quality issues.
              </p>
              <p>
                If you receive a bouquet with a manufacturing defect — such as damaged flowers, incorrect composition, or significant quality issues — please notify us within 24 hours of delivery or pickup. Our team will review your request and offer a suitable solution, such as a replacement bouquet or refund.
              </p>
              <p>
                Natural variations in shade, size, and shape of flowers are not considered defects, as they are inherent to fresh botanical materials.
              </p>
              <p className="text-[#8A8A8A] text-[13px] border-t border-[#E8E2D9] pt-4">
                To report an issue:{' '}
                <a href={`mailto:${site.email}`} className="text-[#1C1C1C] hover:text-[#C9A96E] transition-colors duration-300">
                  {site.email}
                </a>{' '}
                or call{' '}
                <a href={site.phone.href} className="text-[#1C1C1C] hover:text-[#C9A96E] transition-colors duration-300">
                  {site.phone.display}
                </a>
              </p>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
