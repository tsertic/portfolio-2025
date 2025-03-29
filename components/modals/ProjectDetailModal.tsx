// components/modals/ProjectDetailModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { CustomPortableTextComponents } from "../sanity/CustomPortableTextComponents";
import { QueryResultProject } from "@/lib/sanity.queries";
import Image from "next/image";
import Link from "next/link";
// import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'; // Example icons

interface ProjectDetailModalProps {
  project: QueryResultProject | null; // Project to display, or null if hidden
  onClose: () => void; // Function to close the modal
}

// Animation variants for the modal container
const modalVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Animation variants for the backdrop
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  // Self-comment: Use AnimatePresence to handle exit animations when 'project' becomes null.
  return (
    <AnimatePresence>
      {project && ( // Only render the modal if a project is provided
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/70" // Darker backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose} // Close modal on backdrop click
          />

          {/* Modal Content */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex flex-col bg-white" // Takes full screen
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 sticky top-0">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close project details"
              >
                {/* <FaTimes size={20} /> */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-5 lg:p-6">
              <article>
                {/* Media */}
                <div className="mb-5 rounded-md overflow-hidden border border-gray-100">
                  {project.previewVideoUrl ? (
                    <video
                      key={project._id}
                      src={project.previewVideoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto aspect-video object-cover bg-gray-100"
                    />
                  ) : project.mainImageUrl ? (
                    <Image
                      key={project._id}
                      src={project.mainImageUrl}
                      alt={project.altText || project.title || ""}
                      width={700}
                      height={394}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-gray-400">
                      No preview
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 mb-5 justify-center">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
                    >
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <span>View Code</span>
                    </a>
                  )}
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider">
                      Technologies:
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) =>
                        tech?._id ? (
                          <li
                            key={tech._id}
                            className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            {tech.title}
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                )}

                {/* Body */}
                {project.body && (
                  <div className="prose prose-indigo max-w-none prose-sm">
                    <h4 className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider">
                      About:
                    </h4>
                    <PortableText
                      value={project.body}
                      components={CustomPortableTextComponents}
                    />
                  </div>
                )}
              </article>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
