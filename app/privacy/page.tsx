import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description:
    'How Mother of Flower collects, uses, stores and shares personal information for flower orders and deliveries in Las Vegas, Nevada.',
  alternates: { canonical: '/privacy' },
};

const UPDATED = '2026-08-31';

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated={UPDATED}
      intro={`This policy explains what personal information ${site.name} collects when you order flowers from us, why we collect it, how long we keep it and who we share it with.`}
      sections={[
        {
          heading: 'Who we are',
          body: [
            `${site.name} is a retail florist operating in Las Vegas and Henderson, Nevada, with its boutique at ${site.address.full}. We are the controller of the personal information described in this policy. You can reach us at ${site.email} or ${site.phone.display}.`,
          ],
        },
        {
          heading: 'Information we collect',
          body: [
            'We only ask for what an order actually requires:',
            [
              'Your name, phone number and email address, so we can confirm the order and reach you if something changes.',
              'The recipient’s name and phone number, so the courier can arrange handover.',
              'The delivery address, and the date and time window you select.',
              'The message you ask us to write on the gift card.',
              'Order contents, amounts and the correspondence you send us.',
              'Basic technical data from your browser: IP address, device and browser type, and pages visited.',
            ],
            'We do not ask for, and never store, full payment card numbers. When online payment is enabled, card data will be handled entirely by the payment provider.',
          ],
        },
        {
          heading: 'Why we use it',
          body: [
            [
              'To take, confirm, prepare and deliver your order — this is the main purpose, and without this data we cannot fulfil an order.',
              'To contact you about that order by phone, email or messenger.',
              'To meet accounting and tax obligations under Nevada and US federal law.',
              'To keep the website secure and to understand, in aggregate, how it is used.',
              'To send marketing messages — only if you have separately opted in, and you can withdraw at any time.',
            ],
          ],
        },
        {
          heading: 'The gift card message',
          body: [
            'The text you ask us to write on a card is visible to the florist preparing your order and is printed on the card itself. Please do not include payment details, passwords or other sensitive information in it.',
          ],
        },
        {
          heading: 'Who we share it with',
          body: [
            'We share personal information only with parties that help us complete your order, and only with what they need:',
            [
              'Couriers and delivery staff — recipient name, phone and address.',
              'Our payment provider, once online payments are enabled — order amount and reference; the provider handles card data directly.',
              'Email delivery and hosting providers that operate the website and send order notifications on our behalf.',
              'Website analytics providers, in aggregated form.',
              'Law enforcement or regulators, where we are legally required to disclose.',
            ],
            'We do not sell personal information, and we do not share it for cross-context behavioural advertising.',
          ],
        },
        {
          heading: 'How long we keep it',
          body: [
            'Order records, including recipient and delivery details, are kept for four years from the date of the order to satisfy accounting and tax requirements. Enquiries that do not become orders are deleted within twelve months. Marketing consents are kept until you withdraw them.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'You can ask us to:',
            [
              'Tell you what personal information we hold about you and provide a copy.',
              'Correct anything inaccurate.',
              'Delete your information, where we are not required to keep it.',
              'Stop using it for marketing.',
              'Confirm that we do not sell or share it — we do not.',
            ],
            `Write to ${site.email} and we will respond within 45 days. We may ask you to confirm your identity before acting on a request. Nevada residents have a specific right, under NRS 603A.340, to tell us not to sell their covered information; we do not sell it in any case.`,
          ],
        },
        {
          heading: 'Cookies',
          body: [
            'The website uses a small number of cookies and similar browser storage. Strictly necessary ones keep your shopping bag and saved bouquets between visits — these are stored in your browser and are not sent to us. Analytics cookies, where enabled, help us count visits and see which pages are used.',
            'You can clear or block cookies in your browser settings. Blocking the necessary ones will empty your bag and your saved bouquets.',
          ],
        },
        {
          heading: 'Children',
          body: [
            'The website is intended for adults. We do not knowingly collect information from anyone under 16. If you believe a child has provided us with personal information, write to us and we will delete it.',
          ],
        },
        {
          heading: 'Changes to this policy',
          body: [
            'If we change this policy we will update the date at the top of this page. Material changes will also be announced on the website.',
          ],
        },
      ]}
    />
  );
}
