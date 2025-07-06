import { Hero, About, FeaturedServices, Services, TransformationStories, WhyChooseUs, LocationContact } from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedServices />
      <TransformationStories />
      <WhyChooseUs />
      <Services />
      <LocationContact />
    </>
  );
}