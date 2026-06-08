'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, index, onClick }: ProductCardProps) {
  const heightClass =
    product.aspectClass === 'tall'
      ? 'h-[340px] md:h-[420px]'
      : product.aspectClass === 'wide'
      ? 'h-[220px] md:h-[270px]'
      : 'h-[280px] md:h-[340px]';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => onClick(product)}
    >
      {/* Image */}
      <div className={`relative ${heightClass} overflow-hidden rounded-sm bg-[#F7F5F2]`}>
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1C1C1C]/0 group-hover:bg-[#1C1C1C]/8 transition-colors duration-500" />

        {/* Quick-shop pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          <span className="inline-block px-5 py-2 bg-[#FDFDFD]/90 backdrop-blur-sm text-[11px] tracking-[0.18em] uppercase text-graphite rounded-full whitespace-nowrap">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-[17px] md:text-[19px] text-graphite leading-tight group-hover:opacity-70 transition-opacity duration-300">
            {product.name}
          </h3>
          <p className="font-sans text-[13px] text-muted whitespace-nowrap mt-0.5">
            ${product.price.toLocaleString()}
          </p>
        </div>
        <p className="mt-1 text-[12px] tracking-[0.04em] text-muted/80">{product.tagline}</p>
      </div>
    </motion.article>
  );
}
