'use client';

import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const orderSteps = [
  {
    num: "1",
    text: "You can place an order directly through the cart on our website by choosing any bouquet you love. Simply add it to your cart and proceed to checkout — our system will guide you through the steps, and our manager will contact you if any details need clarification."
  },
  {
    num: "2",
    text: "After receiving your order, our team will get in touch if we need to confirm bouquet availability, make adjustments, or discuss personalization options. If you would like to customize your bouquet, please let us know — we will help you choose flowers, colors, and composition that perfectly match your occasion."
  },
  {
    num: "3",
    text: "Once all details are confirmed, you can complete your payment online. Mother of Flower accepts secure PayPal payments for your convenience. After the payment is processed, your bouquet is prepared fresh on the day of delivery or pickup."
  },
  {
    num: "4",
    text: "Order processing and bouquet preparation typically take from 1 to 3 hours, depending on the volume and complexity of the arrangement. Each bouquet is carefully assembled by our florists to ensure it arrives in perfect condition."
  },
  {
    num: "5",
    text: "You can choose between delivery or store pickup.\n— Delivery is available across Las Vegas and nearby areas.\n— Pickup is available at our boutique in Henderson during working hours.\nYour bouquet will be safely packaged and delivered at the time you selected during checkout."
  }
];

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="w-full bg-[#FAF8F4] py-[80px] md:py-[100px] scroll-mt-[72px]">
      <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="flex flex-col gap-10 md:gap-12"
        >
          {/* ── Header ── */}
          <div className="flex flex-col items-center gap-3 text-center">
            <motion.p variants={fadeUp} className="text-[#C9A96E] text-[11px] font-semibold uppercase tracking-[0.25em]">
              Payment
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-[#1C1C1C] text-[clamp(1.6rem,3vw,2.25rem)] font-bold tracking-tight uppercase">
              How To Order
            </motion.h2>
            <motion.div variants={fadeUp} className="w-8 h-[1.5px] bg-[#C9A96E]" />
          </div>

          {/* ── Steps ── */}
          <div className="flex flex-col">
            {orderSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr] gap-6 md:gap-8 py-7 md:py-8 border-t border-[#E5E2DB] last:border-b"
              >
                {/* Number */}
                <div className="flex items-start pt-0.5">
                  <span className="text-[#1C1C1C] text-[28px] md:text-[36px] font-bold leading-none tabular-nums"
                    style={{ opacity: 0.13 }}>
                    {step.num.padStart(2, '0')}
                  </span>
                </div>
                {/* Text */}
                <p className="text-[#444444] text-[14px] md:text-[15px] leading-[1.85] whitespace-pre-line self-start pt-1">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
