import { Hero, Services, LocationContact } from '@/components/sections';

export const metadata = {
  title: 'Remote Frequency Healing Sessions | The Healing Frequency Space',
  description: 'Experience powerful frequency healing from anywhere in the world. Remote sessions include EMF protection, pet healing, and quantum field technology for global wellness.',
  keywords: 'remote healing, distance healing, frequency healing, EMF protection, pet healing, quantum healing',
};

export default function RemoteHealingPage() {
  return (
    <>
      <Hero />
      <Services />
      <LocationContact />
    </>
  );
}