'use client';

import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
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
    <section className="w-full bg-[#FAF8F4] py-[80px] md:py-[100px] overflow-hidden">
      <div className="max-w-[900px] mx-auto px-[5vw]">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          {/* Header */}
          <div className="flex flex-col gap-3 text-center items-center">
            <motion.p variants={fadeUp} className="text-[#C9A96E] text-[11px] font-semibold uppercase tracking-[0.25em]">
              Payment
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-[#1C1C1C] font-sans text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight uppercase">
              How To Order
            </motion.h2>
            <motion.div variants={fadeUp} className="w-8 h-[1.5px] bg-[#C9A96E] mt-2" />
          </div>

          {/* Steps List */}
          <div className="flex flex-col">
            {orderSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="flex flex-col md:flex-row gap-5 md:gap-10 py-8 border-t border-[#E5E2DB] last:border-b"
              >
                <div className="flex-shrink-0 min-w-[40px]">
                  <span className="text-[#1C1C1C] font-sans text-[28px] md:text-[40px] font-bold leading-none opacity-15 tabular-nums">
                    {step.num.padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#333333] text-[14px] md:text-[15px] leading-[1.85] whitespace-pre-line">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
