'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, X, Menu, Phone, MapPin, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import OrderCallModal from '@/components/modals/OrderCallModal';
import { site } from '@/lib/site';
import { useOverlay } from '@/hooks/useOverlay';

const navLinks = [
  { label: 'Collections', href: '/catalog' },
  { label: 'Weddings', href: '/catalog?category=Wedding+Bouquets' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Occasions', href: '/#occasions' },
  { label: 'Contact', href: '/contact' },
];

const CONTAINER: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  paddingLeft: 'clamp(20px, 5vw, 72px)',
  paddingRight: 'clamp(20px, 5vw, 72px)',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOrderCallOpen, setIsOrderCallOpen] = useState(false);
  const [showDeliveryAlert, setShowDeliveryAlert] = useState(true);
  const { cartCount, setIsCartOpen } = useCart();
  const menuRef = useOverlay<HTMLDivElement>(menuOpen, () => setMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 72,
          transition: 'background-color 0.4s, border-color 0.4s, backdrop-filter 0.4s',
          backgroundColor: scrolled ? 'rgba(253,253,253,0.96)' : 'rgba(253,253,253,0.85)',
          borderBottom: '1px solid #E5E2DB',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <nav style={CONTAINER}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, textDecoration: 'none', flexShrink: 0 }}>
            <span className="text-[20px] md:text-[24px]" style={{ fontFamily: "var(--font-serif)", fontWeight: 500, letterSpacing: '0.04em', color: '#1C1C1C', transition: 'color 0.4s' }}>
              Mother of Flower
            </span>
            <div style={{ height: '1px', width: '100%', backgroundColor: '#1C1C1C', margin: '5px 0', opacity: 0.2, transition: 'background-color 0.4s, opacity 0.4s' }} />
            <span className="text-[12px] md:text-[12px]" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: '0.3em', color: '#5A5A5A', textTransform: 'uppercase', transition: 'color 0.4s' }}>
              Las Vegas
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex" style={{ alignItems: 'center', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2C2C2C', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#2C2C2C')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Order a Call */}
            <button
              onClick={() => setIsOrderCallOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 bg-transparent"
              style={{
                borderColor: '#1C1C1C',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#1C1C1C', textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#1C1C1C';
                e.currentTarget.style.color = '#FDFDFD';
                e.currentTarget.style.borderColor = '#1C1C1C';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1C1C1C';
                e.currentTarget.style.borderColor = '#1C1C1C';
              }}
            >
              <Phone size={13} strokeWidth={1.8} />
              Order a Call
            </button>

            <button
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
              className="tap-target"
              style={{ position: 'relative', padding: 8, color: '#1C1C1C', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.4s' }}
            >
              <ShoppingBag size={22} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', backgroundColor: '#C9A96E', color: '#1C1C1C', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Open menu"
              style={{ padding: 8, color: '#1C1C1C', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.4s' }}
              className="tap-target lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 60, backgroundColor: '#FDFDFD', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', height: 74, borderBottom: '1px solid #F7F5F2' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 21, fontWeight: 500, letterSpacing: '0.04em', color: '#1C1C1C' }}>
                  Mother of Flower
                </span>
                <div style={{ height: '1px', width: '100%', backgroundColor: '#1C1C1C', margin: '4px 0', opacity: 0.2 }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, letterSpacing: '0.3em', color: '#5A5A5A', textTransform: 'uppercase' }}>
                  Las Vegas
                </span>
              </div>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#1C1C1C' }}>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px', gap: 24, overflowY: 'auto' }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: '#1C1C1C', textDecoration: 'none' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="w-full h-px bg-[#E5E2DB] my-2" />

              {/* Quick Contact buttons in mobile drawer */}
              <div className="flex flex-col gap-3">
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    borderRadius: 4,
                    backgroundColor: '#1C1C1C',
                    color: '#FDFDFD',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setMenuOpen(false);
                    setIsOrderCallOpen(true);
                  }}
                >
                  <Phone size={14} strokeWidth={1.8} />
                  Order a Call
                </button>

                <div className="flex gap-2">
                  <a
                    href="https://wa.me/17252242454"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 border border-[#E5E2DB] rounded-[3px] text-[12px] font-bold uppercase tracking-wider text-[#1C1C1C] hover:bg-[#FAF8F4]"
                  >
                    <MessageCircle size={13} color="#25D366" /> WhatsApp
                  </a>
                  <a
                    href="https://t.me/motherofflower"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 border border-[#E5E2DB] rounded-[3px] text-[12px] font-bold uppercase tracking-wider text-[#1C1C1C] hover:bg-[#FAF8F4]"
                  >
                    <MessageCircle size={13} color="#0088cc" /> Telegram
                  </a>
                </div>
              </div>

              {/* Address and Hours Info */}
              <div className="flex flex-col gap-1.5 text-[12px] text-[#6B6B6B] pt-2">
                <div className="flex items-center gap-2 text-[#444444]">
                  <MapPin size={13} className="text-[#C9A96E]" />
                  <span>{site.address.line1}, {site.address.line2}</span>
                </div>
                <div className="flex items-center gap-2 text-[#444444]">
                  <Clock size={13} className="text-[#C9A96E]" />
                  <span>Mon–Sun: 10:00 AM – 7:00 PM</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ВСПЛЫВАЮЩЕЕ ОПОВЕЩЕНИЕ С КНОПКОЙ ЗАКРЫТЬ ── */}
      <AnimatePresence>
        {showDeliveryAlert && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-40 w-[92vw] max-w-[440px] bg-[#1C1C1C]/95 backdrop-blur-md text-[#FDFDFD] p-3.5 pl-4 pr-3 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-[#333333] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-[#C9A96E] flex-shrink-0">
                <Sparkles size={16} />
              </span>
              <div className="text-[13px] leading-snug text-[#F0EDE6]">
                <span>Same-Day Luxury Delivery in Las Vegas &amp; Henderson · Order Before 2 PM</span>
                <span className="mx-1.5 text-[#C9A96E]">✦</span>
                <a
                  href={site.phone.href}
                  className="font-bold text-[#C9A96E] hover:underline whitespace-nowrap"
                >
                  {site.phone.display}
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowDeliveryAlert(false)}
              aria-label="Close notification"
              className="text-[#6B6B6B] hover:text-[#FDFDFD] p-1.5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
            >
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <OrderCallModal isOpen={isOrderCallOpen} onClose={() => setIsOrderCallOpen(false)} />
    </>
  );
}
