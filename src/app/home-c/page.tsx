import { HeroC, About, FeaturedServices, Services, TransformationStories, WhyChooseUs, LocationContact } from '@/components/sections';

export default function HomePageC() {
  return (
    <>
      <HeroC />
      <About />
      <FeaturedServices />
      <TransformationStories />
      <WhyChooseUs />
      <Services />
      <LocationContact />
    </>
  );
}