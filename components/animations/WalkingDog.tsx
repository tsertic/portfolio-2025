"use client";

import React, { useState, useEffect, useRef } from "react";

// Sprite sheet specifications
const SPRITE_WIDTH = 60;
const SPRITE_HEIGHT = 38;
const TOTAL_FRAMES = 6;
const WALK_ROW_INDEX = 1;
const ANIMATION_SPEED_MS = 120;
const MOVEMENT_SPEED_PX = 3;
const SCALE_FACTOR = 1.5;

const WalkingDog = () => {
  const [frame, setFrame] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = right, -1 = left

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const intervalId = setInterval(() => {
      let nextX = positionX + MOVEMENT_SPEED_PX * direction;
      let currentDirection = direction;

      const screenWidth = window.innerWidth;
      const visualDogWidth = SPRITE_WIDTH * SCALE_FACTOR;

      // Check boundaries and change direction if needed
      if (nextX + visualDogWidth > screenWidth) {
        nextX = screenWidth - visualDogWidth;
        currentDirection = -1;
      } else if (nextX < 0) {
        nextX = 0;
        currentDirection = 1;
      }

      setFrame((prevFrame) => (prevFrame + 1) % TOTAL_FRAMES);
      setPositionX(nextX);
      setDirection(currentDirection);
    }, ANIMATION_SPEED_MS);

    return () => clearInterval(intervalId);
  }, [positionX, direction]);

  const backgroundPosX = -(frame * SPRITE_WIDTH);
  const backgroundPosY = -(WALK_ROW_INDEX * SPRITE_HEIGHT);

  const dogStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "0px",
    left: `${positionX}px`,
    width: `${SPRITE_WIDTH}px`,
    height: `${SPRITE_HEIGHT}px`,
    backgroundImage: `url(/dog_spritesheet.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `${backgroundPosX}px ${backgroundPosY}px`,
    transform: `scaleX(${-direction}) scale(${SCALE_FACTOR})`,
    transformOrigin: "bottom center",
    imageRendering: "pixelated",
    transition: "left 0.1s linear",
    zIndex: 5,
  };

  return <div ref={containerRef} style={dogStyle} />;
};

export default WalkingDog;
