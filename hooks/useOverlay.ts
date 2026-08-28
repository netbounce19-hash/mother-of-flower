'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Shared behaviour for every dialog-like overlay on the site: cart drawer,
 * product modal, the two contact modals and the mobile menu.
 *
 * Handles the four things they were all missing:
 *   - Escape closes the overlay
 *   - focus moves into the panel on open and returns to the trigger on close
 *   - Tab is trapped inside the panel
 *   - the page behind stops scrolling
 *
 * Returns a ref to attach to the panel element.
 */
export function useOverlay<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  onClose: () => void
) {
  const panelRef = useRef<T>(null);

  // Keeps the latest onClose without re-running the main effect every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    // Captured once: the panel element does not change identity while open,
    // and the cleanup needs it after React has already moved on.
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;

    // AnimatePresence does not always unmount an exited panel (framer-motion 12
    // leaves a zero-height, transparent node behind). Left alone, its buttons
    // and inputs stay in the tab order and in the accessibility tree. Marking
    // the panel `inert` on close takes it out of both, whether or not the node
    // is eventually removed.
    panel?.removeAttribute('inert');

    // Compensate for the scrollbar we're about to hide, or the page shifts.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    // Wait a frame so the panel is mounted and its entry animation has begun.
    const focusTimer = window.setTimeout(() => {
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel).focus({ preventScroll: true });
    }, 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      // Restore focus before making the panel inert, or the browser drops
      // focus to <body> instead of returning it to the trigger.
      previouslyFocused?.focus?.({ preventScroll: true });
      panel?.setAttribute('inert', '');
    };
  }, [isOpen]);

  return panelRef;
}
