// hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

// Self-comment: Custom hook to detect if a CSS media query matches.
// Helps create responsive logic directly within components.
// Runs client-side only to prevent hydration errors.
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check immediately in case the component mounts after initial load
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    // Define a function to update state when the media query status changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    // Using addEventListener for modern browsers, fallback for older ones
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      // Deprecated but necessary for fallback
      mediaQueryList.addListener(listener);
    }

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]); // Re-run effect if the query string changes

  return matches;
};

export default useMediaQuery;
