'use client';

import { Calendar } from 'lucide-react';
import {
  DELIVERY_WINDOWS,
  SHOP_TIME_ZONE_LABEL,
  addDays,
  deliveryDateChoices,
  earliestDeliveryDate,
  formatShopDate,
  isWindowAvailable,
  shopNow,
  storeHoursLabel,
} from '@/lib/delivery';

interface DeliverySchedulerProps {
  date: string;
  onDateChange: (date: string) => void;
  window: string | null;
  onWindowChange: (windowKey: string | null) => void;
  /** Pickup swaps the time windows for the boutique's opening hours. */
  method?: 'delivery' | 'pickup';
  labelColor?: string;
}

const LABEL: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  marginBottom: 12,
};

function pill(selected: boolean, disabled: boolean): React.CSSProperties {
  return {
    padding: '10px 16px',
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.02em',
    border: `1px solid ${selected ? '#1C1C1C' : '#E5E2DB'}`,
    backgroundColor: selected ? '#1C1C1C' : 'transparent',
    color: disabled ? '#9A9A9A' : selected ? '#FDFDFD' : '#1C1C1C',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    transition: 'all 0.2s',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
  };
}

export default function DeliveryScheduler({
  date,
  onDateChange,
  window: selectedWindow,
  onWindowChange,
  method = 'delivery',
  labelColor = '#6B6B6B',
}: DeliverySchedulerProps) {
  // Read the shop clock once per render; every decision below derives from it
  // rather than from the visitor's own timezone.
  const now = shopNow();
  const choices = deliveryDateChoices(now);
  const earliest = earliestDeliveryDate(now);
  const maxDate = addDays(now.date, 60);

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...LABEL, color: labelColor }}>
          Delivery Date <span style={{ textTransform: 'none', fontWeight: 500 }}>({SHOP_TIME_ZONE_LABEL})</span>
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {choices.map((choice) => {
            const selected = date === choice.value;
            return (
              <button
                key={choice.value}
                type="button"
                disabled={!choice.available}
                aria-pressed={selected}
                title={choice.unavailableReason}
                onClick={() => onDateChange(choice.value)}
                style={pill(selected, !choice.available)}
              >
                {choice.relativeLabel}, {choice.fullLabel}
              </button>
            );
          })}
        </div>

        {choices.some((c) => !c.available) && (
          <p style={{ fontSize: 12, color: '#8A6A2E', marginBottom: 12 }}>
            {choices.find((c) => !c.available)?.unavailableReason}
          </p>
        )}

        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: '#1C1C1C',
          }}
        >
          <Calendar size={14} strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Choose another delivery date</span>
          <input
            type="date"
            value={date}
            min={earliest}
            max={maxDate}
            onChange={(e) => e.target.value && onDateChange(e.target.value)}
            style={{
              border: '1px solid #E5E2DB',
              borderRadius: 9999,
              padding: '9px 14px',
              fontSize: 13,
              color: '#1C1C1C',
              background: 'transparent',
            }}
          />
        </label>
      </div>

      {method === 'pickup' ? (
        <div style={{ marginBottom: 24 }}>
          <p style={{ ...LABEL, color: labelColor }}>Pickup Hours</p>
          <p style={{ fontSize: 13, color: '#333333' }}>
            Collect from our Henderson boutique on {formatShopDate(date)} — {storeHoursLabel} ({SHOP_TIME_ZONE_LABEL}).
          </p>
        </div>
      ) : (
        <div style={{ marginBottom: 24 }}>
          <p style={{ ...LABEL, color: labelColor }}>Delivery Window</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DELIVERY_WINDOWS.map((w) => {
              const available = isWindowAvailable(w.key, date, now);
              const selected = selectedWindow === w.key;
              return (
                <button
                  key={w.key}
                  type="button"
                  disabled={!available}
                  aria-pressed={selected}
                  title={available ? undefined : 'This window has already passed today'}
                  onClick={() => onWindowChange(w.key)}
                  style={pill(selected, !available)}
                >
                  {w.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
