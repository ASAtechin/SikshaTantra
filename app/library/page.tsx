import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LibraryExperience } from "@/components/library/LibraryExperience";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Online Library: Browse & Read Class 1–12 Books",
  "Explore a curated learning library for Classes 1 to 12 across boards — browse subject books, read chapter by chapter, and check your understanding with takeaways and prompts.",
  "/library"
);

export default function LibraryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-amber-50/40 to-white">
        <LibraryExperience />
      </main>
      <Footer />
    </>
  );
}
