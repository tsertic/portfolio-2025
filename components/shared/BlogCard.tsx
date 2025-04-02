"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { QueryResultPost } from "@/lib/sanity.queries";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: QueryResultPost;
  index: number; // For animation staggering
}

// Animation configuration
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const BlogCard = ({ post, index }: BlogCardProps) => {
  const { title, slug, mainImageUrl, altText, publishedAt, excerpt, author } =
    post;

  const placeholderImage = "/images/placeholder-blog.jpg";

  return (
    <motion.div
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
    >
      <Link
        href={`/blog/${slug?.current || "#"}`}
        aria-label={`Read more about ${title}`}
      >
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image
            src={mainImageUrl || placeholderImage}
            alt={altText || title || "Blog post image"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors hover:text-indigo-600">
            <Link href={`/blog/${slug?.current || "#"}`}>
              {title || "Untitled Post"}
            </Link>
          </h3>

          {excerpt && (
            <p className="mb-3 text-sm text-gray-600 line-clamp-3">{excerpt}</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span className="font-medium">
            {publishedAt ? formatDate(publishedAt) : "Date unavailable"}
          </span>
          {author?.name && <span className="italic">by {author.name}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
