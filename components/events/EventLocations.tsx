'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Clock, Compass, Sparkles, ArrowRight, Calendar } from 'lucide-react';

interface EventLocationsProps {
  onSelectLocation: (locationName: string) => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

interface LocationItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  timing: string;
  distance: string;
  bestFor: string;
  highlights: string[];
}

const LOCATIONS: LocationItem[] = [
  {
    id: 'lakeside',
    name: 'Lakeside Escape',
    subtitle: 'Lake Mead · Boulder City',
    image: '/images/events/locations/lakeside.jpg',
    description:
      'A breathtaking wilderness oasis where tranquil cobalt waters meet rugged desert mountain ranges. The setting sun casts a radiant golden glow across the shoreline, creating an utterly unforgettable backdrop.',
    timing: 'Golden Hour (4:30 PM – 7:30 PM)',
    distance: '35 mins from Las Vegas Strip',
    bestFor: 'Proposals, intimate romantic dinners, luxury milestone celebrations',
    highlights: [
      'Panoramic water & mountain views',
      'Wild desert bighorn sheep sightings',
      'Peaceful secluded shoreline ambiance',
      'Discreet complete styling & cleanup',
    ],
  },
  {
    id: 'strip-lawn',
    name: 'Sunset Strip Lawn',
    subtitle: 'Las Vegas · Golden Hour',
    image: '/images/events/locations/strip_lawn.jpg',
    description:
      'Perched on an elevated scenic lawn above the Las Vegas valley, this location offers an expansive vista of the skyline as twilight falls and the world-famous Strip lights illuminate the desert sky.',
    timing: 'Sunset to Dusk (5:00 PM – 8:30 PM)',
    distance: '15 mins from The Strip',
    bestFor: 'Bachelorette parties, birthday celebrations, corporate cocktail picnics',
    highlights: [
      'Unobstructed Las Vegas Strip skyline',
      'Manicured soft green turf',
      'Glamorous nightfall illumination',
      'Seamless transport and access',
    ],
  },
  {
    id: 'red-rock',
    name: 'Red Rock Canyon Vista',
    subtitle: 'Red Rock Scenic Reserve',
    image: '/images/events/locations/red_rock.jpg',
    description:
      'Surrounded by ancient crimson sandstone cliffs and towering desert peaks. The vibrant natural red hues create an awe-inspiring editorial atmosphere for photography and intimate moments.',
    timing: 'Late Afternoon & Golden Hour',
    distance: '25 mins from Summerlin / Strip',
    bestFor: 'Editorial proposals, bohemian elopements, nature lovers',
    highlights: [
      'Iconic crimson red rock formations',
      'Dramatic golden hour photography light',
      'Crisp, refreshing desert mountain air',
      'Zero light pollution for starry twilight',
    ],
  },
  {
    id: 'private-villa',
    name: 'Private Estate & Penthouse Suite',
    subtitle: 'Las Vegas, Henderson & Summerlin',
    image: '/images/events/locations/private_villa.jpg',
    description:
      'Have our master stylists bring the entire luxury pop-up experience directly to your private villa, backyard lawn, luxury hotel suite terrace, or Airbnb estate.',
    timing: 'Custom / Flexible Anytime',
    distance: 'Citywide Direct Delivery',
    bestFor: 'Private surprises, family celebrations, luxury home entertaining',
    highlights: [
      '100% private and intimate setting',
      'Flexible extended timing',
      'Tailored to your architectural layout',
      'No public park permit requirements',
    ],
  },
];

export default function EventLocations({ onSelectLocation }: EventLocationsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeLoc = LOCATIONS[activeTab];

  return (
    <section id="locations" className="w-full bg-[#FDFDFD] site-section border-t border-[#E5E2DB]">
      <div className="site-container flex flex-col gap-14">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="flex flex-col text-center max-w-3xl mx-auto gap-4"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8A6A2E]">
              Iconic Event Backdrops
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.1] text-[#1C1C1C]"
          >
            Handpicked Scenic Locations
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#666666] text-[15px] leading-relaxed font-normal">
            Whether you envision serene lakeside waters at Lake Mead, an elevated skyline terrace, 
            or a private estate setup, we create magic in every setting.
          </motion.p>
        </motion.div>

        {/* Location Tabs Navigation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
        >
          {LOCATIONS.map((loc, idx) => (
            <button
              key={loc.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-[2px] text-[13px] font-bold uppercase tracking-[0.08em] transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#1C1C1C] text-[#FDFDFD] shadow-md'
                  : 'bg-[#FAF8F4] text-[#555555] border border-[#E5E2DB] hover:border-[#1C1C1C]'
              }`}
            >
              <MapPin size={13} className={activeTab === idx ? 'text-[#C9A96E]' : 'text-[#8A6A2E]'} />
              <span>{loc.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Location Showcase Card */}
        <motion.div
          key={activeLoc.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FAF8F4] border border-[#E5E2DB] rounded-[3px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          {/* Location Big Image */}
          <div className="lg:col-span-7 relative min-h-[340px] md:min-h-[480px] bg-[#1C1C1C] overflow-hidden">
            <Image
              src={activeLoc.image}
              alt={activeLoc.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transform hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/70 via-transparent to-transparent" />
            
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-white">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] block">
                  Location Spotlight
                </span>
                <h3 className="font-serif text-[24px] md:text-[28px] font-medium text-[#FDFDFD]">
                  {activeLoc.name}
                </h3>
              </div>
              <div className="bg-[#1C1C1C]/80 backdrop-blur-md px-3.5 py-1.5 rounded-[2px] text-[12px] font-medium border border-white/20">
                {activeLoc.subtitle}
              </div>
            </div>
          </div>

          {/* Location Details Body */}
          <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between gap-6 bg-[#FAF8F4]">
            <div className="flex flex-col gap-5">
              
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6A2E]">
                  Ambiance &amp; Atmosphere
                </span>
                <p className="text-[14px] text-[#444444] leading-relaxed mt-2 font-medium">
                  {activeLoc.description}
                </p>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-[2px] border border-[#E5E2DB] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8A6A2E]">
                    <Clock size={12} /> Optimal Timing
                  </div>
                  <div className="text-[12.5px] font-semibold text-[#1C1C1C]">
                    {activeLoc.timing}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-[2px] border border-[#E5E2DB] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8A6A2E]">
                    <Compass size={12} /> Distance
                  </div>
                  <div className="text-[12.5px] font-semibold text-[#1C1C1C]">
                    {activeLoc.distance}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-2.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A6A2E]">
                  Highlights:
                </span>
                <ul className="grid grid-cols-1 gap-2 text-[13px] text-[#444444]">
                  {activeLoc.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#C9A96E] text-[10px]">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-[#E5E2DB] flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectLocation(activeLoc.name)}
                className="w-full py-3.5 px-6 bg-[#1C1C1C] text-[#FDFDFD] text-[12px] font-bold uppercase tracking-[0.08em] rounded-[2px] hover:bg-[#C9A96E] hover:text-[#1C1C1C] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calendar size={13} />
                Book at {activeLoc.name}
              </button>
            </div>

          </div>
        </motion.div>

        {/* Location Grid Cards Preview (All 4 Locations) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {LOCATIONS.map((loc, idx) => (
            <div
              key={loc.id}
              onClick={() => setActiveTab(idx)}
              className={`group bg-[#FDFDFD] border rounded-[3px] p-4 flex flex-col gap-3 transition-all cursor-pointer ${
                activeTab === idx
                  ? 'border-[#1C1C1C] shadow-md ring-1 ring-[#1C1C1C]'
                  : 'border-[#E5E2DB] hover:border-[#8A8A8A] hover:shadow-sm'
              }`}
            >
              <div className="relative w-full h-[150px] rounded-[2px] overflow-hidden bg-[#1C1C1C]">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6A2E]">
                  {loc.subtitle}
                </span>
                <h4 className="font-serif text-[16px] font-normal text-[#1C1C1C] group-hover:text-[#8A6A2E] transition-colors">
                  {loc.name}
                </h4>
              </div>
              <div className="text-[11.5px] text-[#777777] line-clamp-2 mt-auto">
                {loc.bestFor}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#1C1C1C] pt-2 border-t border-[#E5E2DB] mt-2">
                <span>View Details</span>
                <ArrowRight size={11} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
