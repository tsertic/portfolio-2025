"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { QueryResultProject } from "@/lib/sanity.queries";

interface ProjectCardProps {
  project: QueryResultProject;
  index: number;
  onClick: (project: QueryResultProject) => void;
}

// Animation configuration for project card entry
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1, // Staggered delay based on card index
      duration: 0.4, // Animation duration
      ease: "easeOut", // Smooth easing function
    },
  }),
};

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const { title, mainImageUrl, altText, technologies } = project;

  const handleCardClick = () => {
    onClick(project);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-gray-300 hover:scale-[1.02]"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      layout
    >
      {/* Image */}
      {mainImageUrl && (
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={mainImageUrl}
            alt={altText || title || "Project image"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 4}
          />
        </div>
      )}
      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">
            {title || "Untitled Project"}
          </h3>
          {technologies && technologies.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {technologies.slice(0, 4).map((tech) =>
                tech?._id ? (
                  <span
                    key={tech._id}
                    className="rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[10px] font-medium"
                  >
                    {tech.title}
                  </span>
                ) : null
              )}
              {technologies.length > 4 && (
                <span className="rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[10px] font-medium">
                  + {technologies.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
