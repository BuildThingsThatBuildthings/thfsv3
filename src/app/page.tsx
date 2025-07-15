import {
  Hero,
  About,
  FeaturedServices,
  Services,
  TransformationStories,
  WhyChooseUs,
  LocationContact,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TransformationStories />
      <FeaturedServices />
      <About />
      <WhyChooseUs />
      <Services />
      <LocationContact />
    </>
  );
}
