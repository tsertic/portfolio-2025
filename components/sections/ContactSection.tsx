// components/sections/ContactSection.tsx
import React from "react";

const ContactSection = () => {
  // Komentar: Kostur za Kontakt. Samo linkovi, bez forme.
  return (
    <section id="contact" className="w-full py-16 md:py-24 lg:py-32">
      {" "}
      {/* Zadnja sekcija, nema border-b */}
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-semibold mb-4">
          Kontakt Sekcija
        </h2>
        <p className="text-center text-gray-600">
          Ovdje će biti email adresa i linkovi na LinkedIn, GitHub, Instagram.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
