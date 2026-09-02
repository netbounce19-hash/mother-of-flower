'use client';

import { useState } from 'react';
import EventsHero from '@/components/events/EventsHero';
import EventPackages from '@/components/events/EventPackages';
import EventInquiryForm from '@/components/events/EventInquiryForm';
import EventsFaq from '@/components/events/EventsFaq';
import EventBookingModal, { PackageDetails } from '@/components/events/EventBookingModal';

export default function EventsPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageDetails | null>(null);
  const [modalMode, setModalMode] = useState<'booking' | 'call'>('booking');

  const handleSelectPackage = (pkg: PackageDetails, mode: 'booking' | 'call') => {
    setSelectedPackage(pkg);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleOpenHeroBooking = () => {
    setSelectedPackage(null);
    setModalMode('booking');
    setIsModalOpen(true);
  };

  const handleOpenHeroCall = () => {
    setSelectedPackage(null);
    setModalMode('call');
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full">
      <EventsHero
        onOpenBooking={handleOpenHeroBooking}
        onOpenCall={handleOpenHeroCall}
      />
      <EventPackages onSelectPackage={handleSelectPackage} />
      <EventInquiryForm />
      <EventsFaq />

      <EventBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
        mode={modalMode}
      />
    </div>
  );
}
