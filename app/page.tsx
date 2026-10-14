import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpatialCanvas } from "@/components/spatial/SpatialCanvas";
import { ContactHub } from "@/components/spatial/ContactHub";
import {
  AudienceStrip,
  BeforeAfter,
  ClosingCta,
  DigiBoardBand,
  FaqTeaser,
  ModuleShowcase,
  OnboardingTeaser,
  SafeguardingBand,
  TrustStrip,
} from "@/components/landing/LandingSections";
import { ScrollProgress } from "@/components/landing/motion-primitives";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <SpatialCanvas />
        <TrustStrip />
        <AudienceStrip />
        <ModuleShowcase />
        <SafeguardingBand />
        <BeforeAfter />
        <DigiBoardBand />
        <OnboardingTeaser />
        <FaqTeaser />
        <ClosingCta />
      </main>
      <Footer />
      <ContactHub />
    </>
  );
}
