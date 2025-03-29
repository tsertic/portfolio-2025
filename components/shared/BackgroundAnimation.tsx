// components/shared/BackgroundAnimation.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Import Next.js Image component

// No longer need the inline PixelShape component

const BackgroundAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [shapes, setShapes] = useState<
    Array<{
      id: number;
      initialX: number;
      initialY: number;
      duration: number; // Faster duration
      delay: number;
    }>
  >([]);

  // Settings for the animation
  const numberOfInvaders = 15; // Increased number of invaders
  const minDuration = 8; // Minimum animation cycle duration (seconds) - Faster
  const maxDuration = 15; // Maximum animation cycle duration (seconds) - Faster
  const invaderWidth = 35; // Adjust size if needed
  const invaderHeight = 25; // Adjust size if needed

  useEffect(() => {
    // Generate shapes properties only on the client
    const generatedShapes = Array.from({ length: numberOfInvaders }).map(
      (_, index) => ({
        id: index,
        initialX: Math.random() * 90 + 5, // Position within 5% to 95% bounds
        initialY: Math.random() * 90 + 5,
        // Calculate random duration within the new faster range
        duration: Math.random() * (maxDuration - minDuration) + minDuration,
        delay: Math.random() * 3, // Random start delay up to 3 seconds
      })
    );
    setShapes(generatedShapes);
    setIsMounted(true);
  }, []); // Empty dependency array ensures this runs only once after mount

  // Render null on server/initial client render to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Render the invaders once mounted
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" // Added pointer-events-none
      aria-hidden="true"
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute" // Will be positioned by style prop
          style={{
            top: `${shape.initialY}%`,
            left: `${shape.initialX}%`,
          }}
          animate={{
            // Slightly more pronounced movement range
            x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0], // Move +/- 30px horizontally
            y: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0], // Move +/- 30px vertically
          }}
          transition={{
            duration: shape.duration, // Use the faster duration
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {/* Container for opacity and the image */}
          <div className="opacity-10 md:opacity-10">
            {" "}
            {/* Adjusted opacity slightly */}
            {/* Use next/image to load the SVG */}
            <Image
              src="/svg/invader.svg" // Path relative to the public folder
              alt="" // Decorative image, alt is empty
              width={invaderWidth}
              height={invaderHeight}
              priority={false} // Not critical to load immediately
              unoptimized={true} // Recommended for SVGs to prevent rasterization if not needed
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
