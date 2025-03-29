// components/sections/IntroSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import BackgroundAnimation from "../shared/BackgroundAnimation"; // Import the new component

// Animation variants (same as before)
const fadeInAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * index, duration: 0.5, ease: "easeOut" },
  }),
};

const IntroSection = () => {
  // Self-comment: Revised intro section featuring updated text to highlight broader skills
  // (including C#, Python, SQL, REST) and a subtle background animation.
  return (
    // Section container setup - Relative positioning needed for the absolute background animation
    <section
      id="intro"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-28 lg:py-36 border-b" // Changed gradient slightly
    >
      {/* Background Animation Component */}
      <BackgroundAnimation />

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        {" "}
        {/* Ensure content is above background */}
        {/* Animated Greeting */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 text-gray-900" // Bolder font
          variants={fadeInAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={1}
        >
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
            Tomislav Sertic
          </span>{" "}
          {/* Gradient text effect */}
        </motion.h1>
        {/* Animated Role/Title */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl mb-8 text-indigo-900 font-semibold" // Darker indigo, bolder
          variants={fadeInAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={2}
        >
          Full-Stack Software Developer {/* Changed title slightly */}
        </motion.p>
        {/* Animated Main Description */}
        <motion.div
          variants={fadeInAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={3}
          className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed" // Added space-y for paragraph spacing
        >
          {/* Revised Paragraph 1: Broader Scope */}
          <p>
            Driven Software Developer from Zagreb{" "}
            <span className="text-xl">🇭🇷</span>, specializing in crafting{" "}
            <strong className="font-semibold text-gray-800">
              high-performance web applications, robust backend systems, and
              effective digital solutions
            </strong>
            . I thrive on tackling complex challenges and transforming ideas
            into reality.
          </p>
          {/* Revised Paragraph 2: Tech Stack Emphasis */}
          <p>
            My core toolkit includes{" "}
            <strong className="font-semibold text-gray-800">
              JavaScript/TypeScript, React, Next.js,
            </strong>{" "}
            and <strong className="font-semibold text-gray-800">Node.js</strong>{" "}
            for dynamic front-ends and APIs. I'm also proficient in backend
            development with{" "}
            <strong className="font-semibold text-gray-800">C#</strong> and
            scripting/automation with{" "}
            <strong className="font-semibold text-gray-800">Python</strong>.
            Building and consuming{" "}
            <strong className="font-semibold text-gray-800">
              RESTful APIs
            </strong>{" "}
            is a key part of my workflow.
          </p>
          {/* Revised Paragraph 3: Databases & AI */}
          <p>
            I have solid experience with both relational (
            <strong className="font-semibold text-gray-800">SQL</strong>) and
            NoSQL databases (like MongoDB, Sanity). Beyond conventional
            development, I actively explore{" "}
            <strong className="font-semibold text-gray-800">
              AI integration
            </strong>{" "}
            to create smarter, more automated applications.
          </p>
        </motion.div>
        {/* Animated Call to Action */}
        <motion.div
          className="mt-12"
          variants={fadeInAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={4}
        >
          <a
            href="#projects" // Changed link to point directly to projects
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-xl hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-70" // Gradient button, bolder text, scale effect
          >
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
