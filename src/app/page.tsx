import {
  Hero,
  About,
  FeaturedServices,
  TransformationStories,
  LocationContact,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <About />
      <TransformationStories />
      <LocationContact />
    </>
  );
}
