import type { Metadata } from 'next';
import EventsPageClient from '@/components/events/EventsPageClient';

export const metadata: Metadata = {
  title: 'Pop-Up Picnics & Bespoke Events — Mother of Flower Las Vegas',
  description:
    'Experience bespoke outdoor picnics, proposals, birthdays, and celebrations in Las Vegas & Lake Mead. Full-service styling, rugs, cushions, and signature fresh florals.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Pop-Up Picnics & Bespoke Events — Mother of Flower Las Vegas',
    description:
      'Curated picnic packages and bespoke floral styling for proposals, anniversaries, and private events in Las Vegas.',
    url: '/events',
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}
