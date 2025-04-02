// components/sections/IntroSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import BackgroundAnimation from "../shared/BackgroundAnimation";
import { siteConfig } from "@/config/site";
import WalkingDog from "../animations/WalkingDog";

// Animation variants for fade in and slide up effects
const fadeInAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const IntroSection = () => {
  return (
    <section
      id="intro"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden    border-b border-gray-200 my-0 py-0 mt-[-60px] md:mt-[-120px]"
    >
      <BackgroundAnimation />
      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl ">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 text-gray-900"
          variants={fadeInAnimation}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Hi, I&apos;m
          <span className=" ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
            {siteConfig.name}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl mb-8 text-indigo-900 font-semibold"
          variants={fadeInAnimation}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Full-Stack Software Developer
        </motion.p>

        <motion.div
          variants={fadeInAnimation}
          initial="hidden"
          animate="visible"
          custom={3}
          className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed"
        >
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
          <p>
            My core toolkit includes{" "}
            <strong className="font-semibold text-gray-800">
              JavaScript/TypeScript, React, Next.js,
            </strong>{" "}
            and <strong className="font-semibold text-gray-800">Node.js</strong>{" "}
            for dynamic front-ends and APIs. I&apos;m also proficient in backend
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

        <motion.div
          className="mt-12"
          variants={fadeInAnimation}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <a
            href="#projects"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-xl hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-70"
          >
            View My Work
          </a>
        </motion.div>
      </div>
      <WalkingDog />
    </section>
  );
};

export default IntroSection;
