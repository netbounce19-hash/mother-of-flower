'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Product, SizeOption, BoxColor } from '@/types';
import DropHintModal from '@/components/modals/DropHintModal';
import { useCart } from '@/contexts/CartContext';
import { useOverlay } from '@/hooks/useOverlay';
import DeliveryScheduler from '@/components/delivery/DeliveryScheduler';
import { unitPriceFor } from '@/lib/pricing';
import {
  DELIVERY_WINDOWS,
  earliestDeliveryDate,
  isWindowAvailable,
  shopNow,
} from '@/lib/delivery';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const BOX_COLORS: { label: BoxColor; hex: string }[] = [
  { label: 'Blush Pink', hex: '#E8C5BE' },
  { label: 'Warm White', hex: '#F7F3EE' },
  { label: 'Black', hex: '#1C1C1C' },
];

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [selectedBox, setSelectedBox] = useState<BoxColor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Reset the picker when a different bouquet is opened. Adjusting state
  // during render (React's documented pattern) rather than in an effect
  // avoids rendering one product's options against another's for a frame.
  const [lastProductId, setLastProductId] = useState<string | null>(null);
  if (product && product.id !== lastProductId) {
    setLastProductId(product.id);
    setSelectedSize(product.sizes[0]);
    setSelectedBox(product.boxColors[0]);
    setSelectedDate(null);
    setSelectedWindow(null);
    setImageIndex(0);
    setAddedToCart(false);
  }

  // Fall back to the first option on the very first render for this product.
  const activeSize = selectedSize ?? product?.sizes[0] ?? 'Classic';
  const activeBox = selectedBox ?? product?.boxColors[0] ?? 'Warm White';

  // Dates default to the earliest slot the shop can actually fulfil, computed
  // in Las Vegas time rather than the visitor's timezone.
  const now = shopNow();
  const activeDate = selectedDate ?? earliestDeliveryDate(now);
  const activeWindow =
    selectedWindow ??
    DELIVERY_WINDOWS.find((w) => isWindowAvailable(w.key, activeDate, now))?.key ??
    null;

  const unitPrice = product ? unitPriceFor(product, activeSize, activeBox) : 0;

  const panelRef = useOverlay<HTMLDivElement>(Boolean(product) && !hintOpen, onClose);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      product,
      size: activeSize,
      boxColor: activeBox,
      deliveryDate: activeDate,
      deliveryWindow: activeWindow,
      unitPrice,
      quantity: 1,
    });
    
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose(); // Optional: close modal after adding
    }, 1000);
  };

  const nextImage = () => {
    if (!product) return;
    setImageIndex((i) => (i + 1) % product.images.length);
  };
  const prevImage = () => {
    if (!product) return;
    setImageIndex((i) => (i - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
      <AnimatePresence>
        {product && (
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ backgroundColor: 'rgba(28,28,28,0.45)' }}
              className="fixed inset-0 z-[80] backdrop-blur-sm"
              onClick={onClose}
            />

          )}

          {product && (
            <motion.div
              key="modal-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={product.name}
              tabIndex={-1}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              style={{ backgroundColor: '#FDFDFD' }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[90] w-full md:w-[92vw] md:max-w-5xl rounded-t-2xl md:rounded-2xl overflow-hidden max-h-[92dvh] md:max-h-[88vh] flex flex-col"
            >
              {/* Close button */}
              <button
                aria-label="Close"
                onClick={onClose}
                style={{ backgroundColor: '#F7F5F2' }}
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
              >
                <X size={16} strokeWidth={1.5} color="#1C1C1C" />
              </button>

              <div className="flex flex-col md:flex-row h-full overflow-hidden">
                {/* Left — Image */}
                <div
                  className="relative w-full md:w-[46%] flex-shrink-0 overflow-hidden"
                  style={{ minHeight: '280px', backgroundColor: '#F7F5F2' }}
                >
                  {/*
                    Deliberately not wrapped in AnimatePresence. A nested
                    AnimatePresence inside this panel stopped the panel's own
                    exit from completing, leaving a zero-height dialog in the
                    DOM whose controls were still reachable by keyboard.
                    Re-keying on imageIndex replays the fade-in, which is all
                    this transition ever needed.
                  */}
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[imageIndex]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 46vw"
                      className="object-cover"
                    />
                  </motion.div>

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        style={{ backgroundColor: 'rgba(253,253,253,0.85)' }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center hover:opacity-70 transition-opacity"
                      >
                        <ChevronLeft size={16} strokeWidth={1.5} color="#1C1C1C" />
                      </button>
                      <button
                        onClick={nextImage}
                        style={{ backgroundColor: 'rgba(253,253,253,0.85)' }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center hover:opacity-70 transition-opacity"
                      >
                        <ChevronRight size={16} strokeWidth={1.5} color="#1C1C1C" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {product.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImageIndex(i)}
                            style={{
                              borderRadius: 9999,
                              transition: 'all 0.3s',
                              width: i === imageIndex ? 20 : 6,
                              height: 6,
                              backgroundColor: i === imageIndex ? '#FDFDFD' : 'rgba(253,253,253,0.5)',
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Right — Details (scrollable) */}
                <div
                  className="flex-1 flex flex-col overflow-y-auto"
                  style={{ padding: '2rem 2.5rem', paddingBottom: '2rem' }}
                >
                  {/* SKU */}
                  <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 12 }}>
                    {product.sku}
                  </p>

                  {/* Title */}
                  <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#1C1C1C', lineHeight: 1.08, marginBottom: 4 }}>
                    {product.name}
                  </h2>
                  <p style={{ fontSize: 14, color: '#5A5A5A', fontWeight: 500, fontStyle: 'italic', marginBottom: 16 }}>{product.tagline}</p>

                  {/* Price */}
                  <p style={{ fontSize: 24, fontWeight: 700, color: '#1C1C1C', marginBottom: 24 }}>
                    {product.currency} {unitPrice.toLocaleString()}
                  </p>

                  <div style={{ width: '100%', height: 1, backgroundColor: '#E5E2DB', marginBottom: 24 }} />

                  {/* Description */}
                  <p style={{ fontSize: 14, color: '#333333', fontWeight: 500, lineHeight: 1.7, marginBottom: 28 }}>{product.description}</p>

                  <DeliveryScheduler
                    date={activeDate}
                    onDateChange={(d) => {
                      setSelectedDate(d);
                      // A window valid for today may already have passed for
                      // the newly picked date — let it re-resolve.
                      setSelectedWindow(null);
                    }}
                    window={activeWindow}
                    onWindowChange={setSelectedWindow}
                  />

                  {/* Size */}
                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 12 }}>Size</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          style={{
                            padding: '10px 20px',
                            borderRadius: 9999,
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            border: `1px solid ${activeSize === size ? '#1C1C1C' : '#E5E2DB'}`,
                            backgroundColor: activeSize === size ? '#1C1C1C' : 'transparent',
                            color: activeSize === size ? '#FDFDFD' : '#1C1C1C',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Box Color */}
                  <div style={{ marginBottom: 32 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 12 }}>Box</p>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {BOX_COLORS.filter((bc) => product.boxColors.includes(bc.label)).map((bc) => (
                        <button
                          key={bc.label}
                          onClick={() => setSelectedBox(bc.label)}
                          title={bc.label}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 4,
                            backgroundColor: bc.hex,
                            border: `2px solid ${activeBox === bc.label ? '#1C1C1C' : 'transparent'}`,
                            outline: activeBox === bc.label ? 'none' : '1px solid #E5E2DB',
                            transform: activeBox === bc.label ? 'scale(1.12)' : 'scale(1)',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {activeBox === bc.label && (
                            <Check size={12} strokeWidth={2.5} color={bc.label === 'Black' ? '#FDFDFD' : '#1C1C1C'} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
                    <button
                      onClick={handleAddToCart}
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-sans)',
                        backgroundColor: addedToCart ? '#4A7C59' : '#1C1C1C',
                        color: '#FDFDFD',
                        border: 'none',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'background-color 0.3s',
                        cursor: 'pointer',
                      }}
                    >
                      {addedToCart ? <><Check size={14} strokeWidth={2.5} /> Added to Cart</> : 'Add to Cart'}
                    </button>

                    <button
                      onClick={() => setHintOpen(true)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-sans)',
                        backgroundColor: 'transparent',
                        color: '#1C1C1C',
                        border: '1px solid #E5E2DB',
                        borderRadius: 2,
                        transition: 'border-color 0.3s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#1C1C1C')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E2DB')}
                    >
                      Drop a Hint
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>

      <DropHintModal product={product} isOpen={hintOpen} onClose={() => setHintOpen(false)} />
    </>
  );
}
