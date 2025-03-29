// components/sections/BlogPreviewSection.tsx
import React from "react";

const BlogPreviewSection = () => {
  // Komentar: Kostur za Blog Preview. Par kartica s najnovijim postovima.
  return (
    <section
      id="blog-preview"
      className="w-full py-16 md:py-24 lg:py-32 border-b bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-semibold mb-4">
          Blog Sekcija (Preview)
        </h2>
        <p className="text-center text-gray-600">
          Ovdje će biti nekoliko najnovijih blog postova (BlogCard komponente) i
          link na glavnu blog stranicu.
        </p>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
