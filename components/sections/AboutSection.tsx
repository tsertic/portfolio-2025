// components/sections/AboutSection.tsx
import React from "react";

const AboutSection = () => {
  // Komentar: Kostur za O Meni sekciju. Tu ide onaj duži tekst.
  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-semibold mb-4">
          O Meni Sekcija
        </h2>
        <p className="text-center text-gray-600">
          Ovdje dolazi detaljniji opis, znanja, posao, offline život...
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
