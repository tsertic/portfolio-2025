"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogListPagePost } from "@/lib/sanity.queries";
import { formatDate } from "@/lib/utils";

interface BlogPageCardProps {
  post: BlogListPagePost;
  index: number; // For animation staggering
}

// Animation configuration
const cardEntryAnimation = {
  hidden: { opacity: 0, y: 25 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Generate random neon color in HSL format (blues, purples, pinks)
const getRandomNeonColor = (): string => {
  const hue = Math.floor(Math.random() * 100) + 240; // Range: 240-340
  return `hsl(${hue}, 100%, 60%)`;
};

const BlogPageCard = ({ post, index }: BlogPageCardProps) => {
  const { title, slug, mainImageUrl, altText, publishedAt, excerpt, author } =
    post;
  const placeholderImage = "/images/placeholder-blog.jpg";
  const postUrl = slug?.current ? `/blog/${slug.current}` : "#";

  // State for dynamic glow effect colors
  const [glowColor1, setGlowColor1] = useState<string>("hsl(260, 100%, 60%)");
  const [glowColor2, setGlowColor2] = useState<string>("hsl(220, 100%, 60%)");

  // Update glow colors on hover
  const handleMouseEnter = () => {
    setGlowColor1(getRandomNeonColor());
    setGlowColor2(getRandomNeonColor());
  };

  return (
    <motion.article
      className="group flex flex-col overflow-visible rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:border-transparent"
      variants={cardEntryAnimation}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      custom={index}
      layout
      style={{ position: "relative" }}
      whileHover={{ y: -5 }}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glow effect background */}
      <div
        className="absolute -inset-2 rounded-xl -z-10 opacity-0 blur-lg transition-all duration-500 ease-in-out group-hover:opacity-60 group-hover:blur-xl pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(to right, ${glowColor1}, ${glowColor2})`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full overflow-hidden rounded-xl bg-white">
        <Link
          href={postUrl}
          className="block overflow-hidden"
          aria-label={`Read more about ${title}`}
        >
          <div className="relative aspect-[16/9] w-full bg-gray-100">
            <Image
              src={mainImageUrl || placeholderImage}
              alt={altText || title || "Blog post image"}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h2 className="mb-2 text-lg md:text-xl font-semibold leading-snug text-gray-900">
            <Link
              href={postUrl}
              className="hover:text-indigo-700 transition-colors"
            >
              {title || "Untitled Post"}
            </Link>
          </h2>

          {excerpt && (
            <p className="mb-4 text-sm md:text-base text-gray-600 line-clamp-3 flex-1">
              {excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 text-xs md:text-sm text-gray-500">
            <span className="font-medium">
              {publishedAt ? formatDate(publishedAt) : "Date N/A"}
            </span>
            {author?.name && <span className="italic">by {author.name}</span>}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPageCard;
