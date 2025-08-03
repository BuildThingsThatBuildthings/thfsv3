import { Services, FeaturedServices } from '@/components/sections';

export const metadata = {
  title: 'Healing Services - Tesla Wellness Table & RoXiva Light Therapy',
  description: 'Discover our transformative healing services including Tesla Wellness Table, RoXiva light therapy, herbal consultations, and remote frequency healing sessions.',
};

export default function ServicesPage() {
  return (
    <>
      <FeaturedServices />
      <Services />
    </>
  );
}