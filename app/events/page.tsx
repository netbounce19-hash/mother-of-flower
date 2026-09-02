import type { Metadata } from 'next';
import EventsPageClient from '@/components/events/EventsPageClient';

export const metadata: Metadata = {
  title: 'Luxury Pop-Up Picnics & Events — Mother of Flower Las Vegas',
  description:
    'Experience bespoke luxury outdoor picnics, proposals, birthdays, and celebrations in Las Vegas & Lake Mead. Full-service styling, rugs, cushions, and signature fresh florals.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Luxury Pop-Up Picnics & Events — Mother of Flower Las Vegas',
    description:
      'Curated luxury picnic packages and bespoke floral styling for proposals, anniversaries, and private events in Las Vegas.',
    url: '/events',
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}
