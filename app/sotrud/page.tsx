import type { Metadata } from 'next';
import PartnershipsHero from '@/components/about/PartnershipsHero';
import PartnershipsContent from '@/components/about/PartnershipsContent';
import PartnershipRequestForm from '@/components/contact/PartnershipRequestForm';

export const metadata: Metadata = {
  title: 'Partnerships — Mother of Flower',
  description: 'Partner with Mother of Flower — luxury floral services for hotels, event planners, and businesses in Las Vegas.',
  alternates: { canonical: '/sotrud' },
  openGraph: {
    title: 'Partnerships — Mother of Flower',
    description: 'Luxury floral services for hotels, event planners and businesses in Las Vegas.',
    url: '/sotrud',
  },
};

export default function SotrudPage() {
  return (
    // No <main> here — the root layout already provides one.
    <div className="flex min-h-screen flex-col items-center justify-between">
      <PartnershipsHero />
      <PartnershipsContent />
      <PartnershipRequestForm />
    </div>
  );
}
