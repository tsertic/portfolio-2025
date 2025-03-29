// components/shared/BlogCard.tsx
"use client"; // Keep as client component if using framer-motion or event handlers

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { QueryResultPost } from "@/lib/sanity.queries"; // Use the specific type for recent posts
import { formatDate } from "@/lib/utils"; // Helper function to format date (we'll create this)

interface BlogCardProps {
  post: QueryResultPost;
  index: number; // For animation staggering
}

// Animation variants for the card (similar to ProjectCard)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15, // Slightly different delay
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const BlogCard = ({ post, index }: BlogCardProps) => {
  const { title, slug, mainImageUrl, altText, publishedAt, excerpt, author } =
    post;

  // Fallback image if mainImageUrl is missing
  const placeholderImage = "/images/placeholder-blog.jpg"; // Add a placeholder image to public/images

  return (
    <motion.div
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible" // Animate when card scrolls into view
      viewport={{ once: true }} // Only animate once
      custom={index} // Pass index for stagger effect
    >
      {/* Link wrapping the image and title for navigation */}
      <Link
        href={`/blog/${slug?.current || "#"}`}
        aria-label={`Read more about ${title}`}
      >
        {/* Blog Post Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          {" "}
          {/* Background color for loading state */}
          <Image
            src={mainImageUrl || placeholderImage} // Use placeholder if no image
            alt={altText || title || "Blog post image"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-300 group-hover:scale-105" // Subtle zoom on hover (needs group on parent Link if used)
          />
        </div>
      </Link>

      {/* Blog Post Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Post Title */}
          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors hover:text-indigo-600">
            <Link href={`/blog/${slug?.current || "#"}`}>
              {title || "Untitled Post"}
            </Link>
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="mb-3 text-sm text-gray-600 line-clamp-3">
              {" "}
              {/* Limit excerpt to 3 lines */}
              {excerpt}
            </p>
          )}
        </div>

        {/* Post Meta (Date and Author) */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span className="font-medium">
            {/* Format date using a helper function */}
            {publishedAt ? formatDate(publishedAt) : "Date unavailable"}
          </span>
          {author?.name && <span className="italic">by {author.name}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
