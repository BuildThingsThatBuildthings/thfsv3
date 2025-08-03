import { RemoteHealing } from '@/components/sections/RemoteHealing';
import { PetHealing } from '@/components/sections/PetHealing';
import { EMFProtection } from '@/components/sections/EMFProtection';
import { LocationContact } from '@/components/sections/LocationContact';

export const metadata = {
  title: 'Remote Frequency Healing Sessions | The Healing Frequency Space',
  description: 'Experience powerful frequency healing from anywhere in the world. Remote sessions include EMF protection, pet healing, and quantum field technology for global wellness.',
  keywords: 'remote healing, distance healing, frequency healing, EMF protection, pet healing, quantum healing, Nashville healing',
};

export default function RemoteHealingPage() {
  return (
    <>
      <RemoteHealing />
      <PetHealing />
      <EMFProtection />
      <LocationContact />
    </>
  );
}