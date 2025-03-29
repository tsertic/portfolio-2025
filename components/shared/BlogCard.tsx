// components/shared/BlogCard.tsx
import React from "react";

// Tipovi će doći kasnije
interface BlogCardProps {
  // title: string;
  // excerpt: string;
  // imageUrl: string;
  // slug: string;
}

const BlogCard = (/*props: BlogCardProps*/) => {
  // Komentar: Kostur za karticu blog posta.
  return (
    <div className="border rounded-lg p-4 shadow-md bg-gray-50">
      <h3 className="font-bold">Placeholder Naslov Bloga</h3>
      <p className="text-sm text-gray-500">Placeholder sažetak...</p>
      {/* Tu će ići slika, link na post... */}
    </div>
  );
};

export default BlogCard;
