import { SpatialCanvas } from "@/components/spatial/SpatialCanvas";
import { Footer } from "@/components/layout/Footer";
import {
  BeforeAfter,
  ClosingCta,
  DigiBoardBand,
  ModuleShowcase,
  TrustStrip,
} from "@/components/landing/LandingSections";
import { ScrollProgress } from "@/components/landing/motion-primitives";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="flex-1">
        <SpatialCanvas />
        <TrustStrip />
        <ModuleShowcase />
        <BeforeAfter />
        <DigiBoardBand />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
