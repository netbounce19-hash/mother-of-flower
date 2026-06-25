import ContactHero from '@/components/contact/ContactHero';
import HowToOrder from '@/components/contact/HowToOrder';
import DeliveryAndReturns from '@/components/contact/DeliveryAndReturns';

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <ContactHero />
      <HowToOrder />
      <DeliveryAndReturns />
    </main>
  );
}
