// components/sections/ProjectsSection.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import ProjectCard from "../shared/ProjectCard";
import ProjectDetailModal from "../modals/ProjectDetailModal";
import useMediaQuery from "@/hooks/useMediaQuery";
import { PortableText } from "@portabletext/react";
import { CustomPortableTextComponents } from "../sanity/CustomPortableTextComponents";
import {
  getAllProjects,
  getAllTechnologies,
  QueryResultProject,
} from "@/lib/sanity.queries";
import { Technology } from "@/lib/types";
import Image from "next/image";

// Constants for pagination
const INITIAL_LOAD_COUNT = 6;
const LOAD_MORE_INCREMENT = 4;

const ProjectsSection = () => {
  // --- State Variables ---
  const [allProjects, setAllProjects] = useState<QueryResultProject[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedTechId, setSelectedTechId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProjectDesktop, setSelectedProjectDesktop] =
    useState<QueryResultProject | null>(null);
  const [modalProject, setModalProject] = useState<QueryResultProject | null>(
    null
  );
  const [visibleProjectCount, setVisibleProjectCount] =
    useState<number>(INITIAL_LOAD_COUNT);

  const isMobile = useMediaQuery("(max-width: 767px)");

  // --- Data Fetching Effect ---
  // Self-comment: Fetches projects and technologies, updates selection based on viewport
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setVisibleProjectCount(INITIAL_LOAD_COUNT);
      try {
        const [projectsData, techData] = await Promise.all([
          getAllProjects(),
          getAllTechnologies(),
        ]);
        const sortedProjects = projectsData;
        setAllProjects(sortedProjects);
        setTechnologies(techData);

        if (sortedProjects.length > 0 && !isMobile) {
          setSelectedProjectDesktop(sortedProjects[0]);
        } else if (isMobile) {
          setSelectedProjectDesktop(null);
        }
      } catch (error) {
        console.error("Failed to fetch project data:", error);
        // TODO: Add user-facing error state and message
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isMobile]);

  // --- Filtered Projects Calculation ---
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(allProjects)) return [];

    let filtered = allProjects;
    if (selectedTechId !== "all") {
      filtered = allProjects.filter(
        (project) =>
          project &&
          project.technologies?.some((tech) => tech?._id === selectedTechId)
      );
    }
    return filtered;
  }, [allProjects, selectedTechId]);

  // --- "Load More" Functionality ---
  const handleLoadMore = () => {
    setVisibleProjectCount((prevCount) =>
      Math.min(prevCount + LOAD_MORE_INCREMENT, filteredProjects.length)
    );
  };

  const canLoadMore = visibleProjectCount < filteredProjects.length;

  // --- Event Handlers ---
  const handleFilterChange = (techId: string) => {
    setSelectedTechId(techId);
    setVisibleProjectCount(INITIAL_LOAD_COUNT);

    // Update desktop selection based on new filter
    if (!isMobile) {
      let newFilteredList = allProjects;
      if (techId !== "all") {
        newFilteredList = allProjects.filter(
          (p) => p && p.technologies?.some((t) => t?._id === techId)
        );
      }
      setSelectedProjectDesktop(
        newFilteredList.length > 0 ? newFilteredList[0] : null
      );
    }

    setModalProject(null);
  };

  const handleProjectSelect = (project: QueryResultProject) => {
    if (isMobile) {
      setModalProject(project);
      setSelectedProjectDesktop(null);
    } else {
      setSelectedProjectDesktop(project);
      setModalProject(null);
    }
  };

  const closeModal = () => {
    setModalProject(null);
  };

  // --- Body Scroll Control ---
  // Self-comment: Prevents background scrolling when modal is open
  useEffect(() => {
    if (modalProject && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalProject, isMobile]);

  return (
    <>
      <section
        id="projects"
        className="w-full py-16 md:py-24 lg:py-32 border-b border-gray-200 bg-gray-50 min-h-screen"
      >
        <div className="container mx-auto px-4 h-full flex flex-col">
          {/* Section Header Area */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              My Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Explore a selection of my work. Click on a project to see details.
            </p>

            {/* Technology Filters */}
            {technologies.length > 0 && !isLoading && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out ${
                    selectedTechId === "all"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  All
                </button>
                {technologies.map((tech) => (
                  <button
                    key={tech._id}
                    onClick={() => handleFilterChange(tech._id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out ${
                      selectedTechId === tech._id
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {tech.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Content Area (List + Details) */}
          <div
            className={`flex-1 flex gap-8 lg:gap-12 overflow-hidden ${isMobile ? "flex-col" : "flex-row"}`}
          >
            {/* Project List Column */}
            <div
              className={`w-full ${isMobile ? "" : "md:w-3/5 lg:w-2/3"} flex flex-col overflow-hidden`}
            >
              <div className="flex-1 overflow-y-auto pr-2 -mr-2 py-2 pb-4">
                {isLoading ? (
                  <div className="text-center py-10 text-gray-500 text-sm">
                    Loading projects...
                  </div>
                ) : filteredProjects.length > 0 ? (
                  <>
                    {/* Project Cards Grid */}
                    <div
                      className={`grid gap-4 pr-2 ${isMobile ? "grid-cols-1" : "lg:grid-cols-2"}`}
                    >
                      {filteredProjects
                        .slice(0, visibleProjectCount)
                        .map((project, index) => (
                          <ProjectCard
                            key={project._id}
                            project={project}
                            index={index}
                            onClick={handleProjectSelect}
                          />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {canLoadMore && (
                      <div className="mt-8 text-center pr-2">
                        <button
                          onClick={handleLoadMore}
                          className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          aria-label={`Load ${LOAD_MORE_INCREMENT} more projects`}
                        >
                          Load More ({visibleProjectCount} /{" "}
                          {filteredProjects.length})
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-10 text-gray-500 text-sm">
                    No projects found matching the filter.
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Project Details Column */}
            {/* TODO: Consider extracting this into a separate ProjectDetail component to reduce complexity */}
            <div
              className={`hidden md:flex w-full md:w-2/5 lg:w-1/2 flex-col h-full overflow-y-auto bg-white rounded-lg border border-gray-200 shadow-sm p-5 lg:p-6 scroll-smooth`}
            >
              {selectedProjectDesktop ? (
                <article>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">
                    {selectedProjectDesktop.title}
                  </h3>

                  {/* Project Media (Video or Image) */}
                  <div className="mb-4 rounded-md overflow-hidden border border-gray-100 max-w-md mx-auto">
                    {selectedProjectDesktop.previewVideoUrl ? (
                      <video
                        key={selectedProjectDesktop._id}
                        src={selectedProjectDesktop.previewVideoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto aspect-video object-cover bg-gray-100"
                      />
                    ) : selectedProjectDesktop.mainImageUrl ? (
                      <Image
                        key={selectedProjectDesktop._id}
                        src={selectedProjectDesktop.mainImageUrl}
                        alt={
                          selectedProjectDesktop.altText ||
                          selectedProjectDesktop.title ||
                          ""
                        }
                        width={600}
                        height={338}
                        className="w-full h-auto object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                        No preview available
                      </div>
                    )}
                  </div>

                  {/* Project Links */}
                  <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">
                    {selectedProjectDesktop.live && (
                      <a
                        href={selectedProjectDesktop.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
                      >
                        <span>Live Demo</span>
                      </a>
                    )}
                    {selectedProjectDesktop.repository && (
                      <a
                        href={selectedProjectDesktop.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <span>View Code</span>
                      </a>
                    )}
                  </div>

                  {/* Technologies List */}
                  {/* TODO: Consider reusing the tech buttons from filters, but in disabled state */}
                  {selectedProjectDesktop.technologies &&
                    selectedProjectDesktop.technologies.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold mb-1.5 text-gray-500 uppercase tracking-wider">
                          Technologies:
                        </h4>
                        <ul className="flex flex-wrap gap-1.5">
                          {selectedProjectDesktop.technologies.map((tech) =>
                            tech?._id ? (
                              <li
                                key={tech._id}
                                className="bg-gray-100 text-gray-800 text-[10px] font-medium px-2 py-0.5 rounded-full"
                              >
                                {tech.title}
                              </li>
                            ) : null
                          )}
                        </ul>
                      </div>
                    )}

                  {/* Project Body Content */}
                  {selectedProjectDesktop.body && (
                    <div className="prose prose-indigo max-w-none prose-sm">
                      <h4 className="text-xs font-semibold mb-1.5 text-gray-500 uppercase tracking-wider">
                        About:
                      </h4>
                      <PortableText
                        value={selectedProjectDesktop.body}
                        components={CustomPortableTextComponents}
                      />
                    </div>
                  )}
                </article>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  <p>Select a project from the list to see details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Mobile Project Details */}
      <ProjectDetailModal project={modalProject} onClose={closeModal} />
    </>
  );
};

export default ProjectsSection;
