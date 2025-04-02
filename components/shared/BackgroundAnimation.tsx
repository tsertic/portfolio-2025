"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BackgroundAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [shapes, setShapes] = useState<
    Array<{
      id: number;
      initialX: number;
      initialY: number;
      duration: number;
      delay: number;
    }>
  >([]);

  // Animation configuration
  const numberOfInvaders = 15;
  const minDuration = 8; // Animation duration in seconds
  const maxDuration = 15;
  const invaderWidth = 35; // Size in pixels
  const invaderHeight = 25;

  useEffect(() => {
    // Generate random properties for each invader
    const generatedShapes = Array.from({ length: numberOfInvaders }).map(
      (_, index) => ({
        id: index,
        initialX: Math.random() * 90 + 5, // 5-95% of viewport width
        initialY: Math.random() * 90 + 5, // 5-95% of viewport height
        duration: Math.random() * (maxDuration - minDuration) + minDuration,
        delay: Math.random() * 3, // Stagger animation starts
      })
    );
    setShapes(generatedShapes);
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            top: `${shape.initialY}%`,
            left: `${shape.initialX}%`,
          }}
          animate={{
            // Random floating movement pattern
            x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <div className="opacity-10 md:opacity-10">
            <Image
              src="/svg/invader.svg"
              alt=""
              width={invaderWidth}
              height={invaderHeight}
              priority={false}
              unoptimized={true} // Better for SVGs
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
