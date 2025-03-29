// app/studio/[[...index]]/page.tsx

// Mark this component as a Client Component.
// Sanity Studio relies on browser APIs and cannot be rendered on the server.
"use client";

// Import the component responsible for rendering the Sanity Studio.
import { NextStudio } from "next-sanity/studio";
// Import the Studio configuration we defined earlier.
import config from "./../../../sanity.config"; // Adjust path if your config is located elsewhere

// Define the Next.js page component for the Studio route.
export default function StudioPage() {
  // The NextStudio component handles the rendering of the Sanity Studio interface.
  // We pass our configuration object to initialize it correctly.
  return <NextStudio config={config} />;
}

// Ensure this route is always dynamically rendered.
// The Studio's content and state are inherently dynamic.
export const dynamic = "force-dynamic";
