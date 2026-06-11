'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, index, onClick }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -10, scale: 1.03, rotate: index % 2 === 0 ? 1.5 : -1.5, zIndex: 10, transition: { duration: 0.4, ease: 'easeOut' } }}
      whileTap={{ scale: 0.98, rotate: 0, transition: { duration: 0.2 } }}
      className="group cursor-pointer bg-[#FDFDFD] flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500 rounded-[2px]"
      style={{ padding: '6.5%', paddingBottom: 0 }}
      onClick={() => onClick(product)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#F7F5F2] rounded-[1px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/5 transition-colors duration-500" />

        {/* Quick-shop pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          <span className="inline-block px-5 py-2 bg-[#FDFDFD]/95 backdrop-blur-sm text-[11px] tracking-[0.18em] uppercase text-graphite rounded-full whitespace-nowrap shadow-sm">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center" style={{ minHeight: '110px', padding: '0 1%' }}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-sans text-[12px] tracking-[0.12em] uppercase text-graphite group-hover:opacity-75 transition-opacity duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setAdded(!added)}
              className="p-2 rounded-full hover:bg-[#F7F5F2] transition-colors duration-200"
              style={{ color: added ? '#C9A96E' : '#8A8A8A' }}
            >
              <ShoppingBag size={15} strokeWidth={1.8} />
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="p-2 rounded-full hover:bg-[#F7F5F2] transition-colors duration-200"
              style={{ color: liked ? '#E02424' : '#8A8A8A' }}
            >
              <Heart size={15} fill={liked ? '#E02424' : 'none'} strokeWidth={1.8} />
            </button>
          </div>
        </div>
        <p className="font-sans text-[12px] tracking-[0.12em] text-[#8A8A8A] mt-1 uppercase">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </motion.article>
  );
}
