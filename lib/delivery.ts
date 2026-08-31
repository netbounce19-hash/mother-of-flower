/**
 * Delivery scheduling, always in the shop's own timezone.
 *
 * Every "today" / "tomorrow" / cut-off decision here is computed in
 * `America/Los_Angeles`, never in the visitor's timezone. A customer ordering
 * from Moscow at 02:14 on 31 Aug was previously offered "Tomorrow — Tue 1 Sept"
 * while it was still 16:14 on 30 Aug in Las Vegas, so the shop would have seen
 * a delivery date two days out.
 */

export const SHOP_TIME_ZONE = 'America/Los_Angeles';
export const SHOP_TIME_ZONE_LABEL = 'Las Vegas time';

/** Same-day orders close at this hour, shop time. */
export const SAME_DAY_CUTOFF_HOUR = 14;

/** Boutique opening hours, shop time (Mon–Sun). */
export const STORE_OPEN_HOUR = 10;
export const STORE_CLOSE_HOUR = 19;

export interface DeliveryWindow {
  key: string;
  label: string;
  startHour: number;
  endHour: number;
}

export const DELIVERY_WINDOWS: DeliveryWindow[] = [
  { key: '10-12', label: '10:00 AM – 12:00 PM', startHour: 10, endHour: 12 },
  { key: '12-14', label: '12:00 PM – 2:00 PM', startHour: 12, endHour: 14 },
  { key: '14-16', label: '2:00 PM – 4:00 PM', startHour: 14, endHour: 16 },
  { key: '16-18', label: '4:00 PM – 6:00 PM', startHour: 16, endHour: 18 },
];

export const DELIVERY_WINDOW_KEYS = DELIVERY_WINDOWS.map((w) => w.key);

/** Wall-clock reading of an instant in the shop's timezone. */
export interface ShopNow {
  /** Calendar date as YYYY-MM-DD in shop time. */
  date: string;
  hour: number;
  minute: number;
}

const partsFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: SHOP_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function shopNow(instant: Date = new Date()): ShopNow {
  const parts = partsFormatter.formatToParts(instant);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    hour: Number(get('hour')),
    minute: Number(get('minute')),
  };
}

/** Adds whole days to a YYYY-MM-DD string without touching timezones. */
export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  // UTC arithmetic on a date-only value: no DST or offset involved.
  const t = Date.UTC(y, m - 1, d) + days * 86_400_000;
  const next = new Date(t);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}`;
}

const labelFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

/** "Sat, Aug 31" for a YYYY-MM-DD value, formatted stably. */
export function formatShopDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  return labelFormatter.format(new Date(Date.UTC(y, m - 1, d)));
}

export function isSameDayOrderingOpen(now: ShopNow = shopNow()): boolean {
  return now.hour < SAME_DAY_CUTOFF_HOUR && now.hour >= STORE_OPEN_HOUR - 1;
}

/**
 * Whether a window can still be booked for a given date.
 * Past windows on today's date are unavailable; a window is also dropped once
 * the shop can no longer prepare it (we require a full hour of lead time).
 */
export function isWindowAvailable(
  windowKey: string,
  isoDate: string,
  now: ShopNow = shopNow()
): boolean {
  const win = DELIVERY_WINDOWS.find((w) => w.key === windowKey);
  if (!win) return false;
  if (isoDate > now.date) return true;
  if (isoDate < now.date) return false;
  return win.startHour > now.hour;
}

/** Earliest date the shop will deliver on, in shop time. */
export function earliestDeliveryDate(now: ShopNow = shopNow()): string {
  return isSameDayOrderingOpen(now) ? now.date : addDays(now.date, 1);
}

export interface DateChoice {
  value: string;
  /** "Today" / "Tomorrow" / weekday name. */
  relativeLabel: string;
  fullLabel: string;
  available: boolean;
  unavailableReason?: string;
}

/** The quick date choices offered next to the calendar input. */
export function deliveryDateChoices(now: ShopNow = shopNow()): DateChoice[] {
  const today = now.date;
  const tomorrow = addDays(today, 1);
  const sameDayOpen = isSameDayOrderingOpen(now);

  return [
    {
      value: today,
      relativeLabel: 'Today',
      fullLabel: formatShopDate(today),
      available: sameDayOpen,
      unavailableReason: sameDayOpen
        ? undefined
        : 'Same-day ordering closed for today',
    },
    {
      value: tomorrow,
      relativeLabel: 'Tomorrow',
      fullLabel: formatShopDate(tomorrow),
      available: true,
    },
  ];
}

export const storeHoursLabel = `Mon – Sun, ${STORE_OPEN_HOUR}:00 AM – ${
  STORE_CLOSE_HOUR - 12
}:00 PM`;
