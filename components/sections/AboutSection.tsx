// components/sections/AboutSection.tsx
"use client"; // Needed for framer-motion

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Animation variants (same as before)
const sectionFadeIn = {
  /* ... */
};

const AboutSection = () => {
  const profileImagePath = "/images/tomislav-dog.jpg"; // Adjust path as needed

  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 lg:py-32 border-b border-gray-200 bg-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          // ... animation props ...
        >
          About Me
        </motion.h2>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Left Column (Image and Intro) */}
          <motion.div
            className="lg:col-span-1 flex flex-col items-center lg:items-start"
            // ... animation props ...
          >
            {/* Profile Image */}
            <div className="relative w-48 h-48 md:w-60 md:h-60 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-indigo-100">
              <Image
                src={profileImagePath}
                alt="Tomislav Sertic with his dog"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 192px, 240px"
                priority
              />
            </div>
            {/* Intro Text */}
            <h3 className="text-2xl font-semibold mb-3 text-center lg:text-left text-gray-800">
              Hello there.
            </h3>
            {/* --- UPDATED INTRO TEXT --- */}
            <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              I'm <strong className="font-medium">Tomislav Sertic</strong>, a
              versatile software developer from Zagreb, Croatia{" "}
              <span className="text-xl">🇭🇷</span>, passionate about building
              robust applications and solving complex problems with code.
            </p>
            <p className="mt-3 text-gray-600 text-center lg:text-left">
              With 5 years of experience, my focus is on developing scalable,
              efficient, and user-friendly software solutions, while also being
              proficient in modern web technologies.
            </p>
            {/* --- END UPDATED INTRO TEXT --- */}
          </motion.div>
          {/* Right Column (Details: Knowledge, Work, Offline) */}
          <motion.div
            className="lg:col-span-2 space-y-10"
            // ... animation props ...
          >
            {/* --- UPDATED KNOWLEDGE SECTION --- */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2 border-indigo-100">
                Technical Skills
              </h3>
              <div className="space-y-4 text-gray-700 text-sm md:text-base">
                <p>
                  <strong className="font-medium text-gray-800">
                    Core Languages:
                  </strong>{" "}
                  Proficient in{" "}
                  <strong className="font-medium">JavaScript/TypeScript</strong>{" "}
                  and <strong className="font-medium">C#</strong>. Experienced
                  with <strong className="font-medium">Python</strong> for
                  scripting and automation tasks.
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    Web Development:
                  </strong>{" "}
                  Strong command of{" "}
                  <strong className="font-medium">React</strong> and{" "}
                  <strong className="font-medium">Next.js</strong> for building
                  dynamic front-end experiences. Skilled in{" "}
                  <strong className="font-medium">Node.js</strong> (Express) for
                  backend services. Proficient with SCSS and{" "}
                  <strong className="font-medium">Tailwind CSS</strong>.
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    API Development:
                  </strong>{" "}
                  Experienced in designing and building{" "}
                  <strong className="font-medium">RESTful APIs</strong> using
                  both <strong className="font-medium">Node.js</strong> and{" "}
                  <strong className="font-medium">
                    C# (.NET Core/ASP.NET)
                  </strong>
                  .
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    Databases:
                  </strong>{" "}
                  Solid experience with relational databases (
                  <strong className="font-medium">SQL</strong>) and NoSQL
                  databases (<strong className="font-medium">MongoDB</strong>,
                  Sanity, Firestore).
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    AI & Automation:
                  </strong>{" "}
                  Interested in leveraging{" "}
                  <strong className="font-medium">AI models</strong> (cloud &
                  local) for enhancing applications. Utilize{" "}
                  <strong className="font-medium">Python</strong> for creating
                  various automation scripts.
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    Tools & Design:
                  </strong>{" "}
                  Comfortable translating Figma designs into code and using
                  Adobe Creative Suite when needed.
                </p>
              </div>
            </div>
            {/* --- END UPDATED KNOWLEDGE SECTION --- */}

            {/* --- UPDATED WORK SECTION --- */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2 border-indigo-100">
                Professional Experience
              </h3>
              <div className="space-y-4 text-gray-700 text-sm md:text-base">
                <p>
                  <strong className="font-medium text-gray-800">
                    Current Role:
                  </strong>{" "}
                  Software Developer at{" "}
                  <strong className="font-medium">Arctis d.o.o</strong>{" "}
                  (Archibus IWMS Representatives).
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    Key Responsibilities:
                  </strong>{" "}
                  Full lifecycle involvement including server setup, database
                  integration (primarily SQL), and programming custom features
                  and integrations using JavaScript and other relevant
                  technologies.
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    Significant Projects:
                  </strong>{" "}
                  Gained extensive experience collaborating with large corporate
                  clients. Notably contributed to a project for{" "}
                  <strong className="font-medium">Saudi Aramco</strong>,
                  involving data analysis and React development within the
                  Archibus ecosystem.
                </p>
              </div>
            </div>
            {/* --- END UPDATED WORK SECTION --- */}

            {/* --- UPDATED OFFLINE SECTION --- */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2 border-indigo-100">
                Beyond the Keyboard
              </h3>
              <div className="space-y-4 text-gray-700 text-sm md:text-base">
                <p>
                  <strong className="font-medium text-gray-800">
                    Balanced Life:
                  </strong>{" "}
                  I strive for balance. When I'm not coding, you'll find me
                  spending quality time with my{" "}
                  <strong className="font-medium">family</strong> and my loyal{" "}
                  <strong className="font-medium">dog</strong>.
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    Active Pursuits:
                  </strong>{" "}
                  I'm an avid{" "}
                  <strong className="font-medium">basketball</strong> player
                  (Pregrada Barbari - CroHoops), enjoy{" "}
                  <strong className="font-medium">cycling</strong>, exploring
                  nature through <strong className="font-medium">hiking</strong>
                  , and diving.
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    Mind Games:
                  </strong>{" "}
                  I also enjoy unwinding with a game of{" "}
                  <strong className="font-medium">chess</strong>.
                </p>
                <p>
                  <strong className="font-medium text-gray-800">
                    Connect:
                  </strong>{" "}
                  Curious about my offline adventures? Check out my
                  <a
                    href="https://www.instagram.com/your_instagram_handle" // <-- !! ZAMIJENI SVOJIM INSTAGRAM LINKOM !!
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors ml-1"
                  >
                    Instagram
                  </a>
                  .
                </p>
              </div>
            </div>
            {/* --- END UPDATED OFFLINE SECTION --- */}
          </motion.div>{" "}
          {/* End Right Column */}
        </div>{" "}
        {/* End Grid */}
      </div>{" "}
      {/* End Container */}
    </section>
  );
};

export default AboutSection;
