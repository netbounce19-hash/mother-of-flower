'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Lock } from 'lucide-react';

/**
 * Square Web Payments card field.
 *
 * The card number, expiry and CVV live inside Square's own iframes, so those
 * values never touch this page or our server — that is what keeps the shop out
 * of PCI scope. All we ever receive is a single-use token.
 */

type TokenizeResult = { status: string; token?: string; errors?: { message: string }[] };
interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenizeResult>;
  destroy?: () => Promise<void>;
}
interface SquarePayments {
  card: (options?: Record<string, unknown>) => Promise<SquareCard>;
  verifyBuyer: (token: string, details: unknown) => Promise<{ token?: string } | null>;
}
declare global {
  interface Window {
    Square?: { payments: (appId: string, locationId: string) => SquarePayments };
  }
}

const SDK_SRC = {
  sandbox: 'https://sandbox.web.squarecdn.com/v1/square.js',
  production: 'https://web.squarecdn.com/v1/square.js',
} as const;

function loadSdk(environment: 'sandbox' | 'production'): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Square) return Promise.resolve();

  const src = SDK_SRC[environment];
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Square SDK failed to load')));
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Square SDK failed to load'));
    document.head.appendChild(script);
  });
}

export interface CardHandle {
  /** Exchanges the entered card for a one-use token. */
  tokenize: () => Promise<{ token: string; verificationToken?: string }>;
}

interface SquareCardFieldProps {
  applicationId: string;
  locationId: string;
  environment: 'sandbox' | 'production';
  /** Handed back so the checkout form can tokenize on submit. */
  onReady: (handle: CardHandle | null) => void;
  /** Used for 3-D Secure verification when the buyer's bank asks for it. */
  amount: number;
  billingContact?: { givenName?: string; email?: string; phone?: string };
}

export default function SquareCardField({
  applicationId,
  locationId,
  environment,
  onReady,
  amount,
  billingContact,
}: SquareCardFieldProps) {
  const containerId = useId().replace(/:/g, '');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const cardRef = useRef<SquareCard | null>(null);

  // Kept in refs so the effect does not need to re-run — re-attaching the card
  // would wipe whatever the buyer has already typed.
  const amountRef = useRef(amount);
  const contactRef = useRef(billingContact);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    amountRef.current = amount;
    contactRef.current = billingContact;
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await loadSdk(environment);
        if (cancelled || !window.Square) return;

        const payments = window.Square.payments(applicationId, locationId);
        const card = await payments.card({
          style: {
            input: { fontSize: '14px', color: '#1C1C1C' },
            '.input-container': { borderColor: '#E5E2DB', borderRadius: '2px' },
            '.input-container.is-focus': { borderColor: '#1C1C1C' },
            '.message-text.is-error': { color: '#C0392B' },
          },
        });
        if (cancelled) return;

        await card.attach(`#${containerId}`);
        if (cancelled) {
          await card.destroy?.();
          return;
        }

        cardRef.current = card;
        setStatus('ready');

        onReadyRef.current({
          tokenize: async () => {
            const result = await card.tokenize();
            if (result.status !== 'OK' || !result.token) {
              throw new Error(
                result.errors?.[0]?.message ?? 'Please check the card details and try again.'
              );
            }

            // Strong Customer Authentication, when the issuer asks for it.
            let verificationToken: string | undefined;
            try {
              const verification = await payments.verifyBuyer(result.token, {
                amount: amountRef.current.toFixed(2),
                currencyCode: 'USD',
                intent: 'CHARGE',
                billingContact: contactRef.current ?? {},
              });
              verificationToken = verification?.token;
            } catch {
              // Not every card requires it; the charge can still go through.
            }

            return { token: result.token, verificationToken };
          },
        });
      } catch (error) {
        if (cancelled) return;
        console.error('[square] card field failed to initialise:', error);
        setStatus('error');
        setMessage('The card form could not be loaded. Please call us and we will take your order by phone.');
        onReadyRef.current(null);
      }
    })();

    return () => {
      cancelled = true;
      cardRef.current?.destroy?.().catch(() => {});
      cardRef.current = null;
      onReadyRef.current(null);
    };
  }, [applicationId, locationId, environment, containerId]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-[12px] tracking-[0.2em] uppercase" style={{ color: '#1C1C1C' }}>
          Payment
        </h3>
        <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Lock size={12} strokeWidth={1.8} aria-hidden="true" />
          Secured by Square
        </span>
      </div>

      <div id={containerId} className="min-h-[90px]" />

      {status === 'loading' && (
        <p className="text-[13px]" style={{ color: '#6B6B6B' }}>Loading secure card form…</p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-[13px]" style={{ color: '#C0392B' }}>{message}</p>
      )}
      {environment === 'sandbox' && status === 'ready' && (
        <p className="text-[12px]" style={{ color: '#8A6A2E' }}>
          Test mode — use card 4111 1111 1111 1111, any future expiry, CVV 111, postcode 94103.
        </p>
      )}
    </div>
  );
}
