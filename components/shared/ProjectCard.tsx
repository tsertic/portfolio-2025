// components/shared/ProjectCard.tsx
"use client"; // May use client-side hooks or event handlers later

import React from "react";
import Image from "next/image";
import Link from "next/link"; // For linking to project details or live/repo URLs
import { motion } from "framer-motion";
import { QueryResultProject } from "@/lib/sanity.queries"; // Import the specific query result type
import { urlFor } from "@/lib/sanity"; // Import urlFor for images if not getting direct URL

// Define props for the ProjectCard
// Self-comment: Using the specific type returned by our Sanity query for type safety.
interface ProjectCardProps {
  project: QueryResultProject;
  index: number; // For staggering animation
}

// Animation variants for the card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1, // Stagger based on index
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  // Self-comment: Destructure necessary fields from the project prop for easier access.
  const {
    title,
    slug, // Assuming you might want a detail page later: /project/[slug]
    mainImageUrl,
    altText,
    technologies,
    repository,
    live,
  } = project;

  return (
    <motion.div
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible" // Animate when card scrolls into view
      viewport={{ once: true }} // Only animate once
      custom={index} // Pass index for stagger effect
    >
      {/* Project Image */}
      {mainImageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          {" "}
          {/* Fixed height container */}
          <Image
            src={mainImageUrl}
            alt={altText || title || "Project image"} // Provide fallback alt text
            fill // Use fill to cover the container
            style={{ objectFit: "cover" }} // Ensure image covers the area nicely
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
          />
          {/* Optional: Overlay for hover effect or video preview icon */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
               Maybe a play icon if there's a video?
           </div> */}
        </div>
      )}

      {/* Project Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        {" "}
        {/* Use flex-1 to push footer down */}
        <div>
          {/* Project Title */}
          <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
            {/* If you plan detail pages, wrap title in Link */}
            {/* <Link href={`/project/${slug?.current}`}> */}
            {title || "Untitled Project"}
            {/* </Link> */}
          </h3>

          {/* Technologies */}
          {technologies && technologies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {technologies.map(
                (tech) =>
                  tech?._id ? ( // Check if tech and tech._id exist
                    <span
                      key={tech._id}
                      className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                    >
                      {tech.title}
                    </span>
                  ) : null // Render nothing if tech or tech._id is missing
              )}
            </div>
          )}
          {/* Add a short description here if you fetch it in the query */}
          {/* <p className="text-sm text-gray-600 mb-4"> Short project description... </p> */}
        </div>
        {/* Links (Footer) */}
        <div className="mt-4 flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              title="Code Repository"
            >
              {/* You can use an icon here */}
              Code
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              title="Live Preview"
            >
              {/* You can use an icon here */}
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
