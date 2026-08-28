import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import HowToOrder from '@/components/contact/HowToOrder';
import DeliveryAndReturns from '@/components/contact/DeliveryAndReturns';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Contact & How to Order — ${site.name}`,
  description: `Order luxury flowers in Las Vegas: ${site.phone.display}, ${site.email}. Boutique at ${site.address.full}. Same-day delivery citywide, ${site.hours.short}.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact & How to Order — ${site.name}`,
    description: `Order luxury flowers in Las Vegas. Same-day delivery citywide.`,
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="sr-only">Contact Mother of Flower — Las Vegas</h1>
      <ContactHero />
      <HowToOrder />
      <DeliveryAndReturns />
    </div>
  );
}
