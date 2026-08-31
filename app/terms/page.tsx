import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { site } from '@/lib/site';
import { SAME_DAY_CUTOFF_HOUR } from '@/lib/delivery';

export const metadata: Metadata = {
  title: `Terms of Service — ${site.name}`,
  description:
    'Terms governing flower orders, pricing, delivery, pickup, cancellation and liability for Mother of Flower, a florist in Las Vegas, Nevada.',
  alternates: { canonical: '/terms' },
};

const UPDATED = '2026-08-31';

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated={UPDATED}
      intro={`These terms govern orders placed with ${site.name} through this website, by phone or by messenger. By placing an order you agree to them.`}
      sections={[
        {
          heading: 'Who these terms are with',
          body: [
            `${site.name} operates a retail florist business in Las Vegas and Henderson, Nevada, with its boutique at ${site.address.full}. Contact: ${site.email}, ${site.phone.display}.`,
          ],
        },
        {
          heading: 'Placing an order',
          body: [
            'Submitting the checkout form is a request to order, not a concluded contract. Our manager will call you to confirm availability of the blooms, the delivery date and the time window. The contract is formed when we confirm the order with you.',
            'Because every bouquet is made to order from fresh flowers, we may propose a substitution of individual stems of equal or higher value if a specific bloom is unavailable that day. We will not change the overall style, palette or size without your agreement.',
            'Please make sure the recipient name, phone number and address are correct. We cannot deliver on incorrect details, and a redelivery may be charged.',
          ],
        },
        {
          heading: 'Prices, taxes and payment',
          body: [
            'Prices are shown in US dollars and exclude sales tax. Clark County combined sales tax is added at checkout, together with the delivery fee where it applies. The total shown before you submit is an estimate; the final amount is the one we confirm with you by phone.',
            // TODO(payments): replace this paragraph once the payment provider
            // (PayPal or Stripe) is connected and money is taken on-site.
            'No money is taken through this website at present. After we confirm the order by phone, we will send you a payment link or agree another method with you. We do not store card details.',
          ],
        },
        {
          heading: 'Delivery and pickup',
          body: [
            `We deliver across Las Vegas, Henderson and nearby areas. You choose a delivery date and a two-hour window at checkout. Same-day delivery is available for orders confirmed before ${SAME_DAY_CUTOFF_HOUR - 12}:00 PM ${site.city} time, subject to capacity on the day.`,
            'All delivery dates, times and cut-offs on this website are given in Las Vegas time, whatever timezone you are browsing from.',
            `You may instead collect your order from the boutique at ${site.address.full} during opening hours (${site.hours.short}).`,
            'If nobody is available at the address within the chosen window, the courier will try to reach the recipient and, failing that, the person who placed the order. Where it is safe and permitted we may leave the order with a concierge or reception. If the order cannot be handed over, a second attempt may be charged.',
          ],
        },
        {
          heading: 'Changing or cancelling an order',
          body: [
            'You can change or cancel free of charge until we have started preparing your order — in practice, up to 24 hours before the chosen delivery window. Call us on the number above; changes by email may not reach us in time.',
            'After preparation has started, the order cannot be cancelled, because the flowers are cut and assembled specifically for it.',
            'Quality problems are handled under our Refund & Returns Policy.',
          ],
        },
        {
          heading: 'Photographs and natural variation',
          body: [
            'Photographs on the website show a representative example of each arrangement. Fresh flowers vary in shade, size and shape between batches and seasons, so your bouquet will be similar to, but not identical to, the photograph. Such variation is not a defect.',
          ],
        },
        {
          heading: 'Care and safety',
          body: [
            'Flowers are perishable and their life depends on care and conditions after handover. Keep them in clean, cool water away from direct sun, heat and draughts.',
            'Some plants and flowers are toxic to people and animals if eaten, and some may cause allergic reactions. Tell us in advance if the arrangement is for a home with children or pets and we will select accordingly.',
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'To the fullest extent permitted by Nevada law, our total liability in connection with an order is limited to the amount paid for that order. We are not liable for indirect or consequential loss, including missed occasions, lost profit or emotional distress.',
            'We are not liable for delay or failure caused by events beyond our reasonable control, including extreme weather, road closures, supplier failure or the recipient being unavailable.',
            'Nothing in these terms limits liability that cannot be limited by law.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            `All text, photography, arrangement designs and branding on this website belong to ${site.name} and may not be reproduced commercially without written permission.`,
          ],
        },
        {
          heading: 'Governing law',
          body: [
            'These terms are governed by the laws of the State of Nevada, without regard to its conflict of law rules. Any dispute will be brought in the state or federal courts located in Clark County, Nevada, and both parties submit to their jurisdiction.',
          ],
        },
        {
          heading: 'Changes to these terms',
          body: [
            'We may update these terms. The version that applies to your order is the one published when you placed it. The date at the top of this page shows the current version.',
          ],
        },
      ]}
    />
  );
}
