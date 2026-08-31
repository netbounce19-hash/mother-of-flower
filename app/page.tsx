import HeroSection from '@/components/hero/HeroSection';
import ProductGrid from '@/components/products/ProductGrid';
import OccasionsSection from '@/components/occasions/OccasionsSection';
import AboutSection from '@/components/about/AboutSection';
import InstagramReels from '@/components/social/InstagramReels';
import CustomRequestSection from '@/components/contact/CustomRequestSection';
import LocationSection from '@/components/contact/LocationSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <ProductGrid />

      {/* Occasions overview */}
      <OccasionsSection />

      {/* "About" editorial section */}
      <AboutSection />

      {/* Instagram Reels video showcase */}
      <InstagramReels />

      {/* Bespoke Custom Request Form */}
      <CustomRequestSection />

      {/* Location and Delivery Map Widget */}
      <LocationSection />

    </>
  );
}
