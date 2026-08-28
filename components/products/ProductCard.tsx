'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, index, onClick }: ProductCardProps) {
  const { isSaved, toggle } = useWishlist();
  const liked = isSaved(product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { margin: "-30% 0px -30% 0px" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldPlay = isHovered || (isMobile && isInView);

  useEffect(() => {
    if (videoRef.current) {
      if (shouldPlay) {
        videoRef.current.play().catch(e => console.log('Hover play blocked:', e));
      } else {
        videoRef.current.pause();
        // Don't reset currentTime on pause so it feels more natural on mobile scroll
      }
    }
  }, [shouldPlay]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: '-60px' }}
      className="group relative bg-[#FDFDFD] flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500 rounded-[2px]"
      style={{ padding: '6.5%', paddingBottom: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#F7F5F2] rounded-[1px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Hover Video */}
        {product.hoverVideo && (
          <video
            ref={videoRef}
            src={product.hoverVideo}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${shouldPlay ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/5 transition-colors duration-500 z-20" />

        {/* Quick-shop pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0 z-30">
          <span className="inline-block px-8 py-3 bg-[#FDFDFD]/95 backdrop-blur-sm text-[12px] tracking-[0.18em] uppercase text-graphite rounded-full whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-medium">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center" style={{ minHeight: '110px', padding: '0 1%' }}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-sans text-[14px] font-bold tracking-wide uppercase text-graphite group-hover:opacity-75 transition-opacity duration-300">
            {/*
              The card used to be a bare <article onClick>, which mouse users
              could open and keyboard users could not. The title is now the
              real control; its ::after stretches over the whole card so the
              card stays clickable with exactly one stop in the tab order.
            */}
            <button
              type="button"
              onClick={() => onClick(product)}
              className="text-left after:absolute after:inset-0 after:content-[''] after:rounded-[2px] focus:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[#C9A96E]"
            >
              {product.name}
              <span className="sr-only"> — view details</span>
            </button>
          </h3>
          <div className="relative z-10 flex items-center gap-1">
            <button
              type="button"
              aria-label={`Choose options for ${product.name}`}
              onClick={() => onClick(product)}
              className="p-2 rounded-full hover:bg-[#F7F5F2] transition-colors duration-200"
              style={{ color: '#6B6B6B' }}
            >
              <ShoppingBag size={15} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label={liked ? `Remove ${product.name} from favourites` : `Save ${product.name} to favourites`}
              aria-pressed={liked}
              onClick={() => toggle(product.id)}
              className="p-2 rounded-full hover:bg-[#F7F5F2] transition-colors duration-200"
              style={{ color: liked ? '#E02424' : '#6B6B6B' }}
            >
              <Heart size={15} fill={liked ? '#E02424' : 'none'} strokeWidth={1.8} />
            </button>
          </div>
        </div>
        <p className="font-sans text-[14px] font-bold tracking-wide text-[#6B6B6B] mt-1 uppercase">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </motion.article>
  );
}
