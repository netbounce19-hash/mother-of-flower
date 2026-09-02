'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Check, Users, Sparkles, Phone, Calendar, ArrowRight } from 'lucide-react';
import { PackageDetails } from './EventBookingModal';

interface EventPackagesProps {
  onSelectPackage: (pkg: PackageDetails, mode: 'booking' | 'call') => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

interface PackageCardData {
  id: string;
  name: string;
  price: number;
  guests: string;
  tagline: string;
  image: string;
  popular?: boolean;
  features: string[];
  idealFor: string;
}

const PACKAGES: PackageCardData[] = [
  {
    id: 'essential',
    name: 'Essential Picnic',
    price: 850,
    guests: 'Up to 4 guests',
    tagline: 'Intimate boho-chic ambiance with delicate floral accents',
    image: '/images/events/essential.jpg',
    idealFor: 'Date nights, intimate proposals, romantic anniversaries',
    features: [
      'Low picnic table setup',
      'Rug + floor cushions styling',
      'Basic place settings',
      'Candles + simple ambient styling',
      'Small seasonal floral accent',
      'Delivery, setup + cleanup included',
    ],
  },
  {
    id: 'signature',
    name: 'Signature Picnic',
    price: 1250,
    guests: 'Up to 6 guests',
    tagline: 'Extended tablescape with signature floral artistry & glassware',
    image: '/images/events/signature.jpg',
    popular: true,
    idealFor: 'Birthdays, bachelorette gatherings, double dates, celebrations',
    features: [
      'Extended low-table setup',
      'Layered rugs + premium cushions',
      'Full place settings + glassware',
      'Candles + elevated tablescape styling',
      'Signature floral centerpiece arrangement',
      'Delivery, setup + cleanup included',
    ],
  },
  {
    id: 'grand',
    name: 'Grand Picnic',
    price: 1650,
    guests: 'Up to 8 guests',
    tagline: 'The ultimate grand pop-up experience with statement floral design',
    image: '/images/events/luxury.jpg',
    idealFor: 'Grand proposals, milestone birthdays, celebrations',
    features: [
      'Large picnic setup with expanded seating',
      'Premium rugs + abundant cushions',
      'Full tableware + fine glassware',
      'Layered candlelight + ambient styling',
      'Statement floral design centerpiece & accents',
      'Delivery, setup + cleanup included',
    ],
  },
];

export default function EventPackages({ onSelectPackage }: EventPackagesProps) {
  return (
    <section id="packages" className="w-full bg-[#FAF8F4] site-section">
      <div className="site-container flex flex-col gap-14">
        
        {/* Section Title Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="flex flex-col text-center max-w-3xl mx-auto gap-4"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8A6A2E]">
              Curated Event Tiers
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.1] text-[#1C1C1C]"
          >
            Curated Picnic Packages
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#666666] text-[15px] leading-relaxed font-normal">
            Choose your signature tier below. Each package is tailored with bespoke tableware, 
            cozy comfort, and handcrafted fresh florals by Mother of Flower.
          </motion.p>
        </motion.div>

        {/* Packages 3-Card Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {PACKAGES.map((pkg) => {
            const pkgDetails: PackageDetails = {
              id: pkg.id,
              name: pkg.name,
              price: pkg.price,
              guests: pkg.guests,
            };

            return (
              <motion.div
                key={pkg.id}
                variants={fadeUp}
                className={`relative flex flex-col bg-[#FDFDFD] rounded-[3px] border transition-all duration-400 overflow-hidden ${
                  pkg.popular
                    ? 'border-[#C9A96E] shadow-[0_16px_50px_rgba(201,169,110,0.18)] lg:-translate-y-2'
                    : 'border-[#E5E2DB] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-4 right-4 z-20 bg-[#C9A96E] text-[#1C1C1C] text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles size={12} />
                    Most Popular
                  </div>
                )}

                {/* Card Image */}
                <div className="relative w-full h-[220px] bg-[#1C1C1C] overflow-hidden group">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
                  
                  {/* Guest Count Pill on Image */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[#FDFDFD] bg-[#1C1C1C]/70 backdrop-blur-sm px-2.5 py-1 rounded-[2px] text-[12px] font-medium">
                    <Users size={13} className="text-[#C9A96E]" />
                    <span>{pkg.guests}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 md:p-8 flex flex-col flex-1 gap-6">
                  
                  {/* Title & Pricing */}
                  <div className="flex flex-col gap-1 border-b border-[#E5E2DB] pb-5">
                    <h3 className="font-serif text-[24px] font-normal text-[#1C1C1C]">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif text-[32px] font-bold text-[#1C1C1C]">
                        ${pkg.price.toLocaleString()}
                      </span>
                      <span className="text-[13px] text-[#666666] font-medium uppercase tracking-wider">
                        / experience
                      </span>
                    </div>
                    <p className="text-[13px] text-[#666666] leading-relaxed mt-1">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Feature Inclusions List */}
                  <div className="flex flex-col gap-3.5 flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A6A2E]">
                      What&apos;s Included:
                    </span>
                    <ul className="flex flex-col gap-3 text-[13.5px] text-[#333333] font-normal">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-[#FAF8F4] border border-[#C9A96E]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={10} className="text-[#8A6A2E] stroke-[3]" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For Note */}
                  <div className="bg-[#FAF8F4] p-3 rounded-[2px] border border-[#EAE6DF] text-[12px] text-[#555555]">
                    <span className="font-bold text-[#1C1C1C]">Perfect for: </span>
                    {pkg.idealFor}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    <button
                      onClick={() => onSelectPackage(pkgDetails, 'booking')}
                      className={`w-full py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        pkg.popular
                          ? 'bg-[#1C1C1C] text-[#FDFDFD] hover:bg-[#8A6A2E]'
                          : 'bg-[#1C1C1C] text-[#FDFDFD] hover:bg-[#8A6A2E]'
                      }`}
                    >
                      <Calendar size={13} />
                      Book This Package
                    </button>
                    
                    <button
                      onClick={() => onSelectPackage(pkgDetails, 'call')}
                      className="w-full py-2.5 bg-transparent border border-[#D1D1D1] text-[#1C1C1C] text-[12px] font-bold uppercase tracking-[0.08em] rounded-[2px] hover:border-[#1C1C1C] hover:bg-[#FAF8F4] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone size={12} />
                      Order a Callback
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Add-ons & Policy Notice Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="bg-[#FDFDFD] border border-[#E5E2DB] p-8 md:p-10 rounded-[3px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[#8A6A2E] font-bold">✦</span>
              <h4 className="font-sans text-[15px] font-bold uppercase tracking-wider text-[#1C1C1C]">
                Custom Florals, Food &amp; Bespoke Add-Ons Available
              </h4>
            </div>
            <p className="text-[14px] text-[#555555] leading-relaxed">
              Elevate your event with custom floral arches, artisanal grazing boards, bespoke patisserie cakes, champagne bucket styling, and customized neon or acrylic signage.
            </p>
            <div className="text-[12px] text-[#777777] italic mt-1">
              * Note: Food, alcohol, permits &amp; public location permit fees are not included in base tiers and can be arranged upon request.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href="#event-inquiry"
              className="px-8 py-4 bg-[#1C1C1C] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-[0.1em] rounded-[2px] hover:bg-[#8A6A2E] transition-all text-center no-underline flex items-center justify-center gap-2"
            >
              Custom Event Quote
              <ArrowRight size={13} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
