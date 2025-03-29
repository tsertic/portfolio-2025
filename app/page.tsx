// app/page.tsx
import IntroSection from "@/components/sections/IntroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import ContactSection from "@/components/sections/ContactSection";

// Glavna stranica aplikacije
export default function HomePage() {
  // Jednostavno vraćamo sekcije jednu ispod druge
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      {" "}
      {/* Osnovni container */}
      {/* Komentar: Tu idu sve naše sekcije */}
      <IntroSection />
      <ProjectsSection />
      <AboutSection />
      <BlogPreviewSection />
      <ContactSection />
    </main>
  );
}
