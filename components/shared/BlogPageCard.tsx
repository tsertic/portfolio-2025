// components/shared/BlogPageCard.tsx
"use client"; // Mark as Client Component because it uses useState and event handlers

import React, { useState } from "react"; // Import useState hook
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link"; // Import Next.js Link component
import { motion } from "framer-motion"; // Import Framer Motion components
import { BlogListPagePost } from "@/lib/sanity.queries"; // Import the specific type for blog list posts
import { formatDate } from "@/lib/utils"; // Import date formatting utility

// Define the props expected by the component
interface BlogPageCardProps {
  post: BlogListPagePost; // The blog post data
  index: number; // Index for animation staggering
}

// --- Animation Variants ---
// Defines how the card animates into view
const cardEntryAnimation = {
  hidden: { opacity: 0, y: 25 }, // Initial state: invisible and slightly down
  visible: (index: number) => ({
    // Final state: visible and in position
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08, // Stagger animation based on index
      duration: 0.5,
      ease: "easeOut", // Smooth easing
    },
  }),
};

// --- Helper Function for Random Colors ---
// Generates a random HSL color string within a neon range (purples, blues, pinks)
const getRandomNeonColor = (): string => {
  // Hue range: 240 (blue) to 340 (pink/purple)
  const hue = Math.floor(Math.random() * 100) + 240;
  const saturation = 100; // Max saturation for vibrancy
  const lightness = 60; // Bright lightness suitable for neon effect
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
// --- End Helper Function ---

// --- Blog Page Card Component ---
const BlogPageCard = ({ post, index }: BlogPageCardProps) => {
  // Destructure post data for easier access
  const { title, slug, mainImageUrl, altText, publishedAt, excerpt, author } =
    post;
  // Fallback image path if the post doesn't have one
  const placeholderImage = "/images/placeholder-blog.jpg"; // Make sure this image exists in public/images
  // Construct the URL for the blog post page
  const postUrl = slug?.current ? `/blog/${slug.current}` : "#"; // Fallback to '#' if slug is missing

  // --- State for Glow Effect Colors ---
  // Stores the two colors for the gradient background of the glow effect
  const [glowColor1, setGlowColor1] = useState<string>("hsl(260, 100%, 60%)"); // Initial default color 1 (purple)
  const [glowColor2, setGlowColor2] = useState<string>("hsl(220, 100%, 60%)"); // Initial default color 2 (blue)
  // --- End State ---

  // --- Event Handler for Mouse Enter ---
  // Updates the glow colors with new random values when the mouse hovers over the card
  const handleMouseEnter = () => {
    setGlowColor1(getRandomNeonColor()); // Set first color to a new random neon color
    setGlowColor2(getRandomNeonColor()); // Set second color to a new random neon color
  };
  // --- End Event Handler ---

  return (
    // Main article container using Framer Motion
    <motion.article
      // --- Styling & Layout ---
      className="group flex flex-col overflow-visible rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:border-transparent"
      // --- Animation Props ---
      variants={cardEntryAnimation} // Apply entry animation variants
      initial="hidden" // Start from hidden state
      animate="visible" // Animate to visible state immediately (staggered by index)
      viewport={{ once: true }} // Ensure entry animation runs only once
      custom={index} // Pass index for stagger delay calculation
      layout // Enable smooth layout transitions if list order changes
      // --- Interaction & Positioning ---
      style={{ position: "relative" }} // Needed for positioning the absolute glow element
      whileHover={{ y: -5 }} // Slightly lift card on hover (optional)
      onMouseEnter={handleMouseEnter} // Trigger color change on mouse enter
    >
      {/* --- Glow Effect Element --- */}
      {/* This div creates the visual glow effect behind the card content */}
      <div
        className="absolute -inset-2 rounded-xl -z-10 opacity-0 blur-lg transition-all duration-500 ease-in-out group-hover:opacity-60 group-hover:blur-xl pointer-events-none" // Styling for the glow effect (size, shape, blur, opacity transition)
        aria-hidden="true" // Hide from screen readers
        style={{
          // Dynamically set the background gradient using colors from state
          backgroundImage: `linear-gradient(to right, ${glowColor1}, ${glowColor2})`,
        }}
      />
      {/* --- End Glow Effect Element --- */}
      {/* --- Main Card Content Wrapper --- */}
      {/* This div holds the actual visible content and sits above the glow */}
      <div className="relative z-10 flex flex-col h-full overflow-hidden rounded-xl bg-white">
        {" "}
        {/* Ensure content is above glow and maintains card shape */}
        {/* Image Section */}
        <Link
          href={postUrl}
          className="block overflow-hidden"
          aria-label={`Read more about ${title}`}
        >
          {/* Aspect ratio container for the image */}
          <div className="relative aspect-[16/9] w-full bg-gray-100">
            {/* Next.js Optimized Image */}
            <Image
              src={mainImageUrl || placeholderImage} // Use post image or fallback placeholder
              alt={altText || title || "Blog post image"} // Alt text for accessibility
              fill // Make image fill the container
              style={{ objectFit: "cover" }} // Ensure image covers the area without distortion
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" // Responsive image sizes hint
              className="transition-transform duration-500 ease-in-out group-hover:scale-105" // Zoom effect on hover
            />
          </div>
        </Link>
        {/* Text Content Section */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          {" "}
          {/* Padding and flex layout */}
          {/* Post Title */}
          <h2 className="mb-2 text-lg md:text-xl font-semibold leading-snug text-gray-900">
            <Link
              href={postUrl}
              className="hover:text-indigo-700 transition-colors"
            >
              {title || "Untitled Post"} {/* Display title or fallback */}
            </Link>
          </h2>
          {/* Post Excerpt */}
          {/* Render excerpt only if it exists */}
          {excerpt && (
            // flex-1 allows excerpt to grow and push meta info down
            // line-clamp-3 limits the text to 3 lines, adding ellipsis
            <p className="mb-4 text-sm md:text-base text-gray-600 line-clamp-3 flex-1">
              {excerpt}
            </p>
          )}
          {/* Meta Information (Date and Author) */}
          {/* mt-auto pushes this div to the bottom of the flex container */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 text-xs md:text-sm text-gray-500">
            {/* Display Formatted Date */}
            <span className="font-medium">
              {publishedAt ? formatDate(publishedAt) : "Date N/A"}{" "}
              {/* Format date or show fallback */}
            </span>
            {/* Display Author Name if available */}
            {author?.name && <span className="italic">by {author.name}</span>}
          </div>
        </div>{" "}
        {/* End Text Content Section */}
      </div>{" "}
      {/* --- End Main Card Content Wrapper --- */}
    </motion.article> // End Main Article Container
  );
};

export default BlogPageCard; // Export the component
