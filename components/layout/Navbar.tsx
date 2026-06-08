'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Menu, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Collections', href: '#catalog' },
  { label: 'About', href: '#about' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FDFDFD]/90 backdrop-blur-md border-b border-[#E5E5E5]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-lg md:text-xl tracking-[0.12em] text-graphite group-hover:opacity-70 transition-opacity duration-300">
              MOTHER
            </span>
            <span className="font-serif text-[10px] md:text-[11px] tracking-[0.4em] text-muted uppercase mt-[-2px]">
              of flower
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13px] tracking-[0.12em] uppercase text-muted hover:text-graphite transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Order a Call — desktop */}
            <a
              href="tel:+97145551234"
              aria-label="Order a call"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E5E5] text-[11px] tracking-[0.12em] uppercase text-graphite hover:border-graphite hover:bg-[#1C1C1C] hover:text-[#FDFDFD] transition-all duration-300 group"
            >
              <Phone size={13} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              Order a Call
            </a>

            <button
              aria-label="Shopping bag"
              className="relative p-2 text-graphite hover:opacity-60 transition-opacity duration-300"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1C1C1C] text-[#FDFDFD] text-[9px] flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Open menu"
              className="md:hidden p-2 text-graphite hover:opacity-60 transition-opacity duration-300"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} strokeWidth={1.5} />
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
            className="fixed inset-0 z-[60] bg-[#FDFDFD] flex flex-col"
          >
            <div className="flex justify-between items-center px-6 h-16">
              <span className="font-serif text-lg tracking-[0.12em] text-graphite">MOTHER</span>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="p-2 text-graphite hover:opacity-60 transition-opacity"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="font-serif text-4xl text-graphite hover:opacity-50 transition-opacity"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Order a Call — mobile */}
              <motion.a
                href="tel:+97145551234"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                className="inline-flex items-center gap-3 text-[13px] tracking-[0.15em] uppercase text-muted hover:text-graphite transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Phone size={16} strokeWidth={1.5} />
                Order a Call
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
