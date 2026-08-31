'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import type { BoxColor, Product, SizeOption } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { unitPriceFor } from '@/lib/pricing';
import {
  DELIVERY_WINDOWS,
  earliestDeliveryDate,
  isWindowAvailable,
  shopNow,
} from '@/lib/delivery';
import DeliveryScheduler from '@/components/delivery/DeliveryScheduler';
import DropHintModal from '@/components/modals/DropHintModal';
import { productSlug } from '@/lib/catalog';

const BOX_HEX: Record<BoxColor, string> = {
  'Blush Pink': '#E8C5BE',
  'Warm White': '#F7F3EE',
  Black: '#1C1C1C',
};

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [size, setSize] = useState<SizeOption>(product.sizes[0]);
  const [box, setBox] = useState<BoxColor>(product.boxColors[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const now = shopNow();
  const [date, setDate] = useState<string>(earliestDeliveryDate(now));
  const [windowKey, setWindowKey] = useState<string | null>(
    DELIVERY_WINDOWS.find((w) => isWindowAvailable(w.key, earliestDeliveryDate(now), now))?.key ?? null
  );

  const unitPrice = unitPriceFor(product, size, box);

  const handleAdd = () => {
    addToCart({
      product,
      size,
      boxColor: box,
      deliveryDate: date,
      deliveryWindow: windowKey,
      unitPrice,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="w-full bg-[#FDFDFD]" style={{ paddingTop: 130 }}>
      <div className="site-container pb-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center flex-wrap gap-2 text-[12px] text-[#6B6B6B]">
            <li><Link href="/" className="hover:text-[#1C1C1C] underline-offset-4 hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/catalog" className="hover:text-[#1C1C1C] underline-offset-4 hover:underline">Collections</Link></li>
            {product.category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/catalog?category=${encodeURIComponent(product.category)}`}
                    className="hover:text-[#1C1C1C] underline-offset-4 hover:underline"
                  >
                    {product.category}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#1C1C1C] font-semibold">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-[3px] bg-[#F7F5F2]">
              <Image
                src={product.images[imageIndex]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`View image ${i + 1} of ${product.images.length}`}
                    aria-pressed={i === imageIndex}
                    onClick={() => setImageIndex(i)}
                    className={`relative w-20 h-20 rounded-[2px] overflow-hidden border-2 transition-colors ${
                      i === imageIndex ? 'border-[#1C1C1C]' : 'border-transparent'
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-[#6B6B6B] mb-3">
              {product.sku}
            </p>
            <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-normal leading-[1.08] text-[#1C1C1C] mb-2">
              {product.name}
            </h1>
            <p className="text-[15px] italic text-[#5A5A5A] mb-4">{product.tagline}</p>

            <p className="text-[26px] font-bold text-[#1C1C1C] mb-6" aria-live="polite">
              {product.currency} {unitPrice.toLocaleString()}
            </p>

            <div className="w-full h-px bg-[#E5E2DB] mb-6" />

            <p className="text-[15px] text-[#333333] leading-[1.8] mb-8">{product.description}</p>

            <DeliveryScheduler
              date={date}
              onDateChange={(d) => { setDate(d); setWindowKey(null); }}
              window={windowKey}
              onWindowChange={setWindowKey}
            />

            {/* Size */}
            <fieldset className="mb-6 border-0">
              <legend className="text-[13px] font-bold uppercase tracking-[0.04em] text-[#6B6B6B] mb-3">Size</legend>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => {
                  const selected = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSize(s)}
                      className={`px-5 py-2.5 rounded-full text-[13px] font-semibold border transition-colors ${
                        selected
                          ? 'bg-[#1C1C1C] text-[#FDFDFD] border-[#1C1C1C]'
                          : 'bg-transparent text-[#1C1C1C] border-[#E5E2DB] hover:border-[#1C1C1C]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Box */}
            <fieldset className="mb-8 border-0">
              <legend className="text-[13px] font-bold uppercase tracking-[0.04em] text-[#6B6B6B] mb-3">Box</legend>
              <div className="flex gap-3">
                {product.boxColors.map((label) => {
                  const selected = box === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-label={`Box colour: ${label}`}
                      aria-pressed={selected}
                      onClick={() => setBox(label)}
                      className={`w-11 h-11 rounded-[4px] flex items-center justify-center transition-all ${
                        selected ? 'ring-2 ring-offset-2 ring-[#1C1C1C]' : 'ring-1 ring-[#E5E2DB]'
                      }`}
                      style={{ backgroundColor: BOX_HEX[label] }}
                    >
                      {selected && (
                        <Check size={13} strokeWidth={2.5} color={label === 'Black' ? '#FDFDFD' : '#1C1C1C'} />
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 text-[13px] font-bold uppercase tracking-[0.04em] text-[#FDFDFD] rounded-[2px] flex items-center justify-center gap-2 transition-colors"
                style={{ backgroundColor: added ? '#4A7C59' : '#1C1C1C' }}
              >
                {added ? <><Check size={14} strokeWidth={2.5} /> Added to Cart</> : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={() => setHintOpen(true)}
                className="w-full py-3.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#1C1C1C] border border-[#E5E2DB] rounded-[2px] hover:border-[#1C1C1C] transition-colors"
              >
                Drop a Hint
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] font-normal text-[#1C1C1C] mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/catalog/${productSlug(r)}`}
                  className="group flex flex-col gap-3 no-underline"
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-[3px] bg-[#F7F5F2]">
                    <Image
                      src={r.images[0]}
                      alt={r.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="text-[14px] font-bold uppercase tracking-wide text-[#1C1C1C]">{r.name}</h3>
                  <p className="text-[14px] font-bold text-[#6B6B6B]">${r.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <DropHintModal product={product} isOpen={hintOpen} onClose={() => setHintOpen(false)} />
    </div>
  );
}
