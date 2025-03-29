// components/sections/ProjectsSection.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import ProjectCard from "../shared/ProjectCard"; // Card component for the list
import ProjectDetailModal from "../modals/ProjectDetailModal"; // Modal component for mobile details
import useMediaQuery from "@/hooks/useMediaQuery"; // Hook to detect screen size
import { PortableText } from "@portabletext/react"; // Component to render Sanity's Portable Text
import { CustomPortableTextComponents } from "../sanity/CustomPortableTextComponents"; // Custom renderers for Portable Text
import {
  getAllProjects, // Function to fetch projects from Sanity
  getAllTechnologies, // Function to fetch technologies from Sanity
  QueryResultProject, // TypeScript type for the project data structure from the query
} from "@/lib/sanity.queries"; // Sanity query functions and types
import { Technology } from "@/lib/types"; // TypeScript type for Technology
import Image from "next/image"; // Next.js optimized Image component
import Link from "next/link"; // Next.js Link component

// Optional: Icons can be imported if installed, e.g., from react-icons
// import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// --- Constants for Load More Functionality ---
const INITIAL_LOAD_COUNT = 6; // Number of projects shown initially
const LOAD_MORE_INCREMENT = 4; // Number of projects loaded when "Load More" is clicked

const ProjectsSection = () => {
  // --- State Variables ---
  // Stores all projects fetched from Sanity (assumed sorted by priority)
  const [allProjects, setAllProjects] = useState<QueryResultProject[]>([]);
  // Stores available technologies for filtering
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  // Stores the ID of the currently active technology filter ('all' for no filter)
  const [selectedTechId, setSelectedTechId] = useState<string>("all");
  // Tracks whether data is currently being fetched
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Stores the project currently displayed in the desktop detail view (right column)
  const [selectedProjectDesktop, setSelectedProjectDesktop] =
    useState<QueryResultProject | null>(null);
  // Stores the project currently displayed in the mobile modal view (null if closed)
  const [modalProject, setModalProject] = useState<QueryResultProject | null>(
    null
  );
  // Tracks how many projects are currently visible in the list (for "Load More")
  const [visibleProjectCount, setVisibleProjectCount] =
    useState<number>(INITIAL_LOAD_COUNT);

  // Hook to determine if the viewport is mobile width (below Tailwind's 'md' breakpoint)
  const isMobile = useMediaQuery("(max-width: 767px)");

  // --- Data Fetching Effect ---
  // Runs once on component mount and when isMobile changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state
      setVisibleProjectCount(INITIAL_LOAD_COUNT); // Reset visible count on new fetch/resize
      try {
        // Fetch projects and technologies in parallel
        const [projectsData, techData] = await Promise.all([
          getAllProjects(), // Assumes this returns projects sorted by priority
          getAllTechnologies(),
        ]);
        const sortedProjects = projectsData; // Assign fetched projects (already sorted)
        setAllProjects(sortedProjects); // Store all projects
        setTechnologies(techData); // Store technologies

        // Set the initially selected project for the desktop view if applicable
        if (sortedProjects.length > 0 && !isMobile) {
          setSelectedProjectDesktop(sortedProjects[0]); // Select the first (highest priority) project
        } else if (isMobile) {
          // Ensure no project is selected on desktop when in mobile view
          setSelectedProjectDesktop(null);
        }
      } catch (error) {
        console.error("Failed to fetch project data:", error);
        // Consider adding user-facing error handling here
      } finally {
        setIsLoading(false); // Clear loading state regardless of success or error
      }
    };
    fetchData();
  }, [isMobile]); // Dependency array includes isMobile to handle resize across breakpoint

  // --- Filtered Projects Calculation ---
  // useMemo ensures this calculation only runs when allProjects or selectedTechId changes
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(allProjects)) return []; // Safety check

    let filtered = allProjects; // Start with all (sorted) projects
    // Apply technology filter if one is selected
    if (selectedTechId !== "all") {
      filtered = allProjects.filter(
        (project) =>
          project &&
          project.technologies?.some((tech) => tech?._id === selectedTechId)
      );
    }
    return filtered; // Return the filtered (still priority-sorted) list
  }, [allProjects, selectedTechId]); // Dependencies for recalculation

  // --- "Load More" Functionality ---
  // Handler for the "Load More" button click
  const handleLoadMore = () => {
    setVisibleProjectCount((prevCount) =>
      // Increase count by the increment, ensuring it doesn't exceed the total number of filtered projects
      Math.min(prevCount + LOAD_MORE_INCREMENT, filteredProjects.length)
    );
  };
  // Determines if the "Load More" button should be displayed
  const canLoadMore = visibleProjectCount < filteredProjects.length;

  // --- Event Handlers ---

  // Handles changing the active technology filter
  const handleFilterChange = (techId: string) => {
    setSelectedTechId(techId); // Update the selected filter ID
    setVisibleProjectCount(INITIAL_LOAD_COUNT); // Reset the number of visible projects

    // Update the selected project in the desktop view if applicable
    if (!isMobile) {
      // Recalculate the filtered list based on the new techId
      let newFilteredList = allProjects;
      if (techId !== "all") {
        newFilteredList = allProjects.filter(
          (p) => p && p.technologies?.some((t) => t?._id === techId)
        );
      }
      // Select the first project from the newly filtered list for the desktop view
      setSelectedProjectDesktop(
        newFilteredList.length > 0 ? newFilteredList[0] : null
      );
    }

    // Always close the mobile modal when the filter changes
    setModalProject(null);
  };

  // Handles clicking on a project card
  const handleProjectSelect = (project: QueryResultProject) => {
    if (isMobile) {
      // On mobile: Set the project for the modal view and clear desktop selection
      setModalProject(project);
      setSelectedProjectDesktop(null);
    } else {
      // On desktop: Set the project for the detail view and ensure modal is closed
      setSelectedProjectDesktop(project);
      setModalProject(null);
    }
  };

  // Closes the mobile modal view
  const closeModal = () => {
    setModalProject(null);
  };

  // --- Side Effect for Body Scroll ---
  // Prevents the main page body from scrolling when the mobile modal is open
  useEffect(() => {
    if (modalProject && isMobile) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = ""; // Enable body scroll
    }
    // Cleanup function to restore scroll when component unmounts or dependencies change
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalProject, isMobile]); // Dependencies: run when modal or mobile state changes

  // --- JSX Rendering ---
  return (
    // Use React Fragment to allow returning multiple top-level elements (section + modal)
    <>
      <section
        id="projects"
        className="w-full py-16 md:py-24 lg:py-32 border-b border-gray-200 bg-gray-50 min-h-screen"
      >
        {/* Container for section content */}
        <div className="container mx-auto px-4 h-full flex flex-col">
          {/* Section Header Area */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              My Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Explore a selection of my work. Click on a project to see details.
            </p>

            {/* Filter Buttons Area */}
            {/* Render filters only if technologies exist and data is not loading */}
            {technologies.length > 0 && !isLoading && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* 'All' Filter Button */}
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
                {/* Technology Filter Buttons */}
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
          {/* flex-1 ensures this area fills remaining space; layout adjusts based on isMobile */}
          <div
            className={`flex-1 flex gap-8 lg:gap-12 overflow-hidden ${isMobile ? "flex-col" : "flex-row"}`}
          >
            {/* Left Column / Mobile List Area */}
            {/* Takes full width on mobile, ~60-66% on desktop */}
            <div
              className={`w-full ${isMobile ? "" : "md:w-3/5 lg:w-2/3"} flex flex-col overflow-hidden`}
            >
              {/* Scrollable container for the project list */}
              <div className="flex-1 overflow-y-auto pr-2 -mr-2 py-2 pb-4">
                {" "}
                {/* Padding bottom for Load More button space */}
                {isLoading ? (
                  <div className="text-center py-10 text-gray-500 text-sm">
                    Loading projects...
                  </div>
                ) : filteredProjects.length > 0 ? (
                  <>
                    {/* Grid for Project Cards */}
                    {/* Shows 1 column on mobile, 2 columns on large desktop */}
                    <div
                      className={`grid gap-4 pr-2 ${isMobile ? "grid-cols-1" : "lg:grid-cols-2"}`}
                    >
                      {/* Render only the visible slice of projects */}
                      {filteredProjects
                        .slice(0, visibleProjectCount)
                        .map((project, index) => (
                          <ProjectCard
                            key={project._id}
                            project={project}
                            index={index}
                            onClick={handleProjectSelect} // Pass the unified select handler
                          />
                        ))}
                    </div>

                    {/* Load More Button Area */}
                    {/* Display button only if there are more projects to load */}
                    {canLoadMore && (
                      <div className="mt-8 text-center pr-2">
                        {" "}
                        {/* Align button with grid */}
                        <button
                          onClick={handleLoadMore}
                          className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          aria-label={`Load ${LOAD_MORE_INCREMENT} more projects`}
                        >
                          {/* Display count on button */}
                          Load More ({visibleProjectCount} /{" "}
                          {filteredProjects.length})
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  // Message when no projects match the current filter
                  <div className="text-center py-10 text-gray-500 text-sm">
                    No projects found matching the filter.
                  </div>
                )}
              </div>{" "}
              {/* End Scrollable Card List */}
            </div>{" "}
            {/* End Left Column / Mobile List Area */}
            {/* Right Column: Project Details (Desktop View Only) */}
            {/* Hidden below 'md' breakpoint, takes ~33-40% width on desktop */}
            <div
              className={`hidden md:flex w-full md:w-2/5 lg:w-1/3 flex-col h-full overflow-y-auto bg-white rounded-lg border border-gray-200 shadow-sm p-5 lg:p-6 scroll-smooth`}
            >
              {selectedProjectDesktop ? (
                // Render details if a project is selected for desktop view
                <article>
                  {/* Project Title */}
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">
                    {selectedProjectDesktop.title}
                  </h3>

                  {/* Project Media */}
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
                        {/* Optional Icon: <FaExternalLinkAlt className="w-3 h-3" /> */}
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
                        {/* Optional Icon: <FaGithub className="w-3 h-3" /> */}
                        <span>View Code</span>
                      </a>
                    )}
                  </div>

                  {/* Technologies List */}
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

                  {/* Project Body (Portable Text) */}
                  {selectedProjectDesktop.body && (
                    <div className="prose prose-indigo max-w-none prose-sm">
                      {" "}
                      {/* Apply typography styles */}
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
                // Placeholder when no project is selected on desktop
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  <p>Select a project from the list to see details.</p>
                </div>
              )}
            </div>{" "}
            {/* End Right Column (Desktop Details) */}
          </div>{" "}
          {/* End Main Content Area */}
        </div>{" "}
        {/* End Container */}
      </section>{" "}
      {/* End Projects Section */}
      {/* Mobile Modal Component */}
      {/* Rendered outside the section flow, controlled by modalProject state */}
      <ProjectDetailModal project={modalProject} onClose={closeModal} />
    </> // End Fragment
  );
};

export default ProjectsSection;
