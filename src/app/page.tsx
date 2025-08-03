import {
  Hero,
  About,
  FeaturedServices,
  Services,
  TransformationStories,
  WhyChooseUs,
  LocationContact,
} from "@/components/sections";
import { RemoteHealing } from "@/components/sections/RemoteHealing";
import { PetHealing } from "@/components/sections/PetHealing";
import { EMFProtection } from "@/components/sections/EMFProtection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <RemoteHealing />
      <PetHealing />
      <EMFProtection />
      <About />
      <WhyChooseUs />
      <Services />
      <TransformationStories />
      <LocationContact />
    </>
  );
}
