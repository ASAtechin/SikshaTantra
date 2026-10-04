import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { DigiBoardSpotlight } from "@/components/sections/DigiBoardSpotlight";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TeamExpertise } from "@/components/sections/TeamExpertise";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <FeatureGrid />
        <DigiBoardSpotlight />
        <WhyUs />
        <HowItWorks />
        <TeamExpertise />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
