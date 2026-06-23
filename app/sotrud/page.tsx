import PartnershipsHero from '@/components/about/PartnershipsHero';
import PartnershipsContent from '@/components/about/PartnershipsContent';
import PartnershipRequestForm from '@/components/contact/PartnershipRequestForm';

export default function SotrudPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <PartnershipsHero />
      <PartnershipsContent />
      <PartnershipRequestForm />
    </main>
  );
}
