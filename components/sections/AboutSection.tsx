// components/sections/AboutSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

// Animation variant for fade-in and slide-up effect
const sectionFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delay * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AboutSection = () => {
  // Self-comment: Profile image path - make sure this exists in public directory
  const profileImagePath = "/images/ts.png";

  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 lg:py-32 border-b border-gray-200 bg-white  "
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900  "
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          About Me
        </motion.h2>

        {/* Content Grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Left Column: Profile Image and Introduction */}
          <motion.div
            className="lg:col-span-1 flex flex-col items-center lg:items-start"
            variants={sectionFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            {/* Profile Image with responsive sizing */}
            <div className="relative w-48 h-48 md:w-60 md:h-60 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-indigo-100  ">
              <Image
                src={profileImagePath}
                alt={`${siteConfig.name}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 192px, 240px"
                priority
              />
            </div>

            <h3 className="text-2xl font-semibold mb-3 text-center lg:text-left text-gray-800  ">
              Hello there.
            </h3>
            <p className="text-lg text-gray-700   leading-relaxed text-center lg:text-left">
              I&apos;m{" "}
              <strong className="font-medium text-gray-900  ">
                {siteConfig.name}
              </strong>
              , a versatile software developer from Zagreb, Croatia{" "}
              <span className="text-xl">🇭🇷</span>, passionate about building
              robust applications and solving complex problems with code.
            </p>
            <p className="mt-3 text-gray-600   text-center lg:text-left">
              With 5 years of experience, my focus is on developing scalable,
              efficient, and user-friendly software solutions, while also being
              proficient in modern web technologies.
            </p>
          </motion.div>

          {/* Right Column: Technical details in card format */}
          <motion.div
            className="lg:col-span-2 space-y-10"
            variants={sectionFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            {/* Technical Skills Card */}
            <div className="p-6 bg-gray-50   rounded-lg border border-gray-100   shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700   border-b pb-2 border-indigo-100  ">
                Technical Skills
              </h3>
              <div className="space-y-4 text-gray-700   text-sm md:text-base">
                <p>
                  <strong className="font-medium text-gray-800  ">
                    Core Languages:
                  </strong>{" "}
                  Proficient in{" "}
                  <strong className="font-medium">JavaScript/TypeScript</strong>{" "}
                  and <strong className="font-medium">C#</strong>. Experienced
                  with <strong className="font-medium">Python</strong> for
                  scripting and automation tasks.
                </p>
                <p>
                  <strong className="font-medium text-gray-800  ">
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
                  <strong className="font-medium text-gray-800  ">
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
                  <strong className="font-medium text-gray-800  ">
                    Databases:
                  </strong>{" "}
                  Solid experience with relational databases (
                  <strong className="font-medium">SQL</strong>) and NoSQL
                  databases (<strong className="font-medium">MongoDB</strong>,
                  Sanity, Firestore).
                </p>
                <p>
                  <strong className="font-medium text-gray-800  ">
                    AI & Automation:
                  </strong>{" "}
                  Interested in leveraging{" "}
                  <strong className="font-medium">AI models</strong> (cloud &
                  local) for enhancing applications. Utilize{" "}
                  <strong className="font-medium">Python</strong> for creating
                  various automation scripts.
                </p>
                <p>
                  <strong className="font-medium text-gray-800  ">
                    Tools & Design:
                  </strong>{" "}
                  Comfortable translating Figma designs into code and using
                  Adobe Creative Suite when needed.
                </p>
              </div>
            </div>

            {/* Professional Experience Card */}
            <div className="p-6 bg-gray-50   rounded-lg border border-gray-100   shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700   border-b pb-2 border-indigo-100  ">
                Professional Experience
              </h3>
              <div className="space-y-4 text-gray-700   text-sm md:text-base">
                <p>
                  <strong className="font-medium text-gray-800  ">
                    Current Role:
                  </strong>{" "}
                  Software Developer at{" "}
                  <strong className="font-medium">Arctis d.o.o</strong>{" "}
                  (Archibus IWMS Representatives).
                </p>
                <p>
                  <strong className="font-medium text-gray-800  ">
                    Key Responsibilities:
                  </strong>{" "}
                  Full lifecycle involvement including server setup, database
                  integration (primarily SQL), and programming custom features
                  and integrations using JavaScript and other relevant
                  technologies.
                </p>
                <p>
                  <strong className="font-medium text-gray-800  ">
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

            {/* Personal Life Card */}
            <div className="p-6 bg-gray-50   rounded-lg border border-gray-100   shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700   border-b pb-2 border-indigo-100  ">
                Beyond the Keyboard
              </h3>
              <div className="space-y-4 text-gray-700   text-sm md:text-base">
                <p>
                  <strong className="font-medium text-gray-800  ">
                    Balanced Life:
                  </strong>{" "}
                  I strive for balance. When I&apos;m not coding, you&apos;ll
                  find me spending quality time with my{" "}
                  <strong className="font-medium">family</strong> and my loyal{" "}
                  <strong className="font-medium">dog</strong>.
                </p>
                <p>
                  <strong className="font-medium text-gray-800  ">
                    Active Pursuits:
                  </strong>{" "}
                  I&apos;m an avid{" "}
                  <strong className="font-medium">basketball</strong> player
                  (Pregrada Barbari - CroHoops), enjoy{" "}
                  <strong className="font-medium">cycling</strong>, exploring
                  nature through <strong className="font-medium">hiking</strong>
                  , and diving.
                </p>
                <p>
                  <strong className="font-medium text-gray-800  ">
                    Mind Games:
                  </strong>{" "}
                  I also enjoy unwinding with a game of{" "}
                  <strong className="font-medium">chess</strong>.
                </p>
                <p>
                  <strong className="font-medium text-gray-800  ">
                    Connect:
                  </strong>{" "}
                  Curious about my offline adventures? Check out my
                  {/* Conditionally render Instagram link if available in config */}
                  {siteConfig.socials.instagram ? (
                    <a
                      href={siteConfig.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600   hover:text-indigo-800   font-medium transition-colors ml-1"
                    >
                      Instagram
                    </a>
                  ) : (
                    <span className="ml-1 italic text-gray-500">
                      (Instagram link unavailable)
                    </span>
                  )}
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
