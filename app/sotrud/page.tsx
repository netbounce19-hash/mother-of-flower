import type { Metadata } from 'next';
import PartnershipsHero from '@/components/about/PartnershipsHero';
import PartnershipsContent from '@/components/about/PartnershipsContent';
import PartnershipRequestForm from '@/components/contact/PartnershipRequestForm';

export const metadata: Metadata = {
  title: 'Partnerships — Mother of Flower',
  description: 'Partner with Mother of Flower — luxury floral services for hotels, event planners, and businesses in Las Vegas.',
};

export default function SotrudPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <PartnershipsHero />
      <PartnershipsContent />
      <PartnershipRequestForm />
    </main>
  );
}
