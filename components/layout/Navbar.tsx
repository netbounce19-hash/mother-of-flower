'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Menu, Phone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import OrderCallModal from '@/components/modals/OrderCallModal';

const navLinks = [
  { label: 'Collections', href: '#catalog' },
  { label: 'About', href: '#about' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Contact', href: '#contact' },
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
  const { cartCount, setIsCartOpen } = useCart();

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
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 72,
          transition: 'background-color 0.4s, border-color 0.4s, backdrop-filter 0.4s',
          backgroundColor: scrolled ? 'rgba(253,253,253,0.95)' : 'rgba(0, 0, 0, 0.15)',
          borderBottom: scrolled ? '1px solid #E5E5E5' : '1px solid rgba(253,253,253,0.1)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(10px)',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(10px)',
        }}
      >
        <nav style={CONTAINER}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 400, letterSpacing: '0.04em', color: scrolled ? '#1C1C1C' : '#FDFDFD', textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.4)', transition: 'color 0.4s' }}>
              Mother of Flower
            </span>
            <div style={{ height: '1px', width: '100%', backgroundColor: scrolled ? '#1C1C1C' : '#FDFDFD', margin: '6px 0', opacity: scrolled ? 0.2 : 0.4, transition: 'background-color 0.4s, opacity 0.4s' }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 500, letterSpacing: '0.3em', color: scrolled ? '#5A5A5A' : '#EAEAEA', textTransform: 'uppercase', textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.4)', transition: 'color 0.4s' }}>
              Las Vegas
            </span>
          </a>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 40, listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: scrolled ? '#333333' : '#FDFDFD', textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.4)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = scrolled ? '#000000' : '#EAEAEA')}
                  onMouseLeave={e => (e.currentTarget.style.color = scrolled ? '#333333' : '#FDFDFD')}
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
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 24px',
                borderRadius: 9999,
                border: `2px solid ${scrolled ? '#1C1C1C' : 'rgba(253,253,253,0.9)'}`,
                fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                color: scrolled ? '#1C1C1C' : '#FDFDFD', textDecoration: 'none',
                textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.3)',
                boxShadow: scrolled ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
                backdropFilter: scrolled ? 'none' : 'blur(4px)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = scrolled ? '#1C1C1C' : '#FDFDFD';
                e.currentTarget.style.color = scrolled ? '#FDFDFD' : '#1C1C1C';
                e.currentTarget.style.borderColor = scrolled ? '#1C1C1C' : '#FDFDFD';
                e.currentTarget.style.textShadow = 'none';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = scrolled ? '#1C1C1C' : '#FDFDFD';
                e.currentTarget.style.borderColor = scrolled ? '#1C1C1C' : 'rgba(253,253,253,0.9)';
                e.currentTarget.style.textShadow = scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.3)';
              }}
            >
              <Phone size={14} strokeWidth={1.5} />
              Order a Call
            </button>

            <button
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
              style={{ position: 'relative', padding: 8, color: scrolled ? '#1C1C1C' : '#FDFDFD', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.4s' }}
            >
              <ShoppingBag size={22} strokeWidth={1.5} style={{ filter: scrolled ? 'none' : 'drop-shadow(0 2px 10px rgba(0,0,0,0.4))' }} />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', backgroundColor: scrolled ? '#1C1C1C' : '#FDFDFD', color: scrolled ? '#FDFDFD' : '#1C1C1C', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Open menu"
              style={{ padding: 8, color: scrolled ? '#1C1C1C' : '#FDFDFD', background: 'none', border: 'none', cursor: 'pointer', display: 'none', transition: 'color 0.4s' }}
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.5} style={{ filter: scrolled ? 'none' : 'drop-shadow(0 2px 10px rgba(0,0,0,0.4))' }} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 60, backgroundColor: '#FDFDFD', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', height: 80 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 400, letterSpacing: '0.04em', color: '#1C1C1C' }}>
                  Mother of Flower
                </span>
                <div style={{ height: '1px', width: '100%', backgroundColor: '#1C1C1C', margin: '4px 0', opacity: 0.2 }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', color: '#5A5A5A', textTransform: 'uppercase' }}>
                  Las Vegas
                </span>
              </div>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#1C1C1C' }}>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', gap: 32 }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{ fontFamily: "var(--font-sans)", fontSize: 40, color: '#1C1C1C', textDecoration: 'none' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A8A8A', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => {
                  setMenuOpen(false);
                  setIsOrderCallOpen(true);
                }}
              >
                <Phone size={16} strokeWidth={1.5} />
                Order a Call
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <OrderCallModal isOpen={isOrderCallOpen} onClose={() => setIsOrderCallOpen(false)} />
    </>
  );
}
