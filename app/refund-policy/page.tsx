import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Refund & Returns Policy — ${site.name}`,
  description:
    'When Mother of Flower replaces or refunds an order: quality issues, the 24-hour reporting window, and what counts as natural variation in fresh flowers.',
  alternates: { canonical: '/refund-policy' },
};

const UPDATED = '2026-08-31';

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund &amp; Returns Policy"
      updated={UPDATED}
      intro="Every bouquet is handcrafted to order from fresh flowers. This page explains when we replace or refund an order, and how to report a problem."
      sections={[
        {
          heading: 'Why returns are limited',
          body: [
            // Moved here from the "Policy / Returns" block on /contact, which
            // now carries a short summary linking to this page.
            `All ${site.name} bouquets are handcrafted to order using fresh, natural flowers. Because floral compositions are perishable and individually prepared, returns are only possible in the event of confirmed product quality issues.`,
          ],
        },
        {
          heading: 'Quality issues',
          body: [
            'If you receive a bouquet with a manufacturing defect — such as damaged flowers, incorrect composition, or significant quality issues — please notify us within 24 hours of delivery or pickup. Our team will review your request and offer a suitable solution, such as a replacement bouquet or refund.',
            'Please keep the arrangement as delivered and send us photographs taken in daylight. They let us judge the problem quickly and settle most cases the same day.',
          ],
        },
        {
          heading: 'What is not a defect',
          body: [
            'Natural variations in shade, size, and shape of flowers are not considered defects, as they are inherent to fresh botanical materials.',
            'Nor are these:',
            [
              'A bouquet that differs in detail from the photograph on the website, where the style, palette and size match what was ordered.',
              'Wilting caused by care after handover — heat, direct sun, or being left without water.',
              'A substituted stem of equal or higher value where a specific bloom was unavailable and the overall design was preserved.',
              'A failed delivery caused by an incorrect address or an unavailable recipient.',
            ],
          ],
        },
        {
          heading: 'How to report a problem',
          body: [
            `Email ${site.email} or call ${site.phone.display} within 24 hours of delivery or pickup. Include your order details, a short description and photographs. We aim to respond the same working day.`,
          ],
        },
        {
          heading: 'Replacements and refunds',
          body: [
            'Where a claim is confirmed, you choose between a replacement arrangement delivered at our expense, or a refund.',
            'Refunds are issued through Square to the card used for the order. Once we release a refund it usually reaches the card within 5–10 business days, depending on your bank. We cannot refund to a different card or method.',
          ],
        },
        {
          heading: 'Cancelling before delivery',
          body: [
            'Cancellations before preparation begins are free of charge and are covered by our Terms of Service. Once preparation has started, the order cannot be cancelled, because the flowers are cut and assembled for it specifically.',
          ],
        },
      ]}
    />
  );
}
