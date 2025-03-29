// components/sections/ProjectsSection.tsx
import React from "react";

const ProjectsSection = () => {
  // Komentar: Kostur za Projekte. Tu idu kartice s projektima i filteri.
  return (
    <section
      id="projects"
      className="w-full py-16 md:py-24 lg:py-32 border-b bg-white"
    >
      {" "}
      {/* Malo drugačija pozadina */}
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-semibold mb-4">
          Projekti Sekcija
        </h2>
        <p className="text-center text-gray-600">
          Ovdje će biti filteri i popis projekata (ProjectCard komponente).
        </p>
      </div>
    </section>
  );
};

export default ProjectsSection;
