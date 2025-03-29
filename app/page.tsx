// app/page.tsx
import IntroSection from "@/components/sections/IntroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <IntroSection />
      <ProjectsSection />
      <AboutSection />
      <BlogPreviewSection />
      <ContactSection />
    </main>
  );
}
