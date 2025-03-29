// components/sections/ContactSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

// Animation variants
const sectionFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const ContactSection = () => {
  return (
    <section id="contact" className="w-full py-20 md:py-28 lg:py-36 ">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-10 md:mb-14 max-w-xl mx-auto"
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Interested in collaborating or have a question? Feel free to reach
          out. The best way to connect is via email or LinkedIn.
        </motion.p>

        {siteConfig.email && (
          <motion.div
            className="mb-10 md:mb-14"
            variants={sectionFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <FaEnvelope className="w-5 h-5" aria-hidden="true" />
              <span>{siteConfig.email}</span>
            </a>
          </motion.div>
        )}

        <motion.div
          className="flex items-center justify-center gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {siteConfig.socials.linkedin && (
            <motion.a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
              aria-label={`${siteConfig.name} on LinkedIn`}
              title="LinkedIn"
              variants={itemVariants}
            >
              <FaLinkedin size={32} aria-hidden="true" />
            </motion.a>
          )}

          {siteConfig.socials.github && (
            <motion.a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              aria-label={`${siteConfig.name} on GitHub`}
              title="GitHub"
              variants={itemVariants}
            >
              <FaGithub size={32} aria-hidden="true" />
            </motion.a>
          )}

          {siteConfig.socials.instagram && (
            <motion.a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-600 transition-colors duration-300"
              aria-label={`${siteConfig.name} on Instagram`}
              title="Instagram"
              variants={itemVariants}
            >
              <FaInstagram size={32} aria-hidden="true" />
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
