// sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk"; // Core plugin for the standard Sanity editing interface
import { visionTool } from "@sanity/vision"; // Plugin for testing GROQ queries

// Import schema definitions from the 'schemas' directory
// These define the structure of our content in the CMS.
import author from "./schemas/author";
import category from "./schemas/category";
import blockContent from "./schemas/blockContent";
import contact from "./schemas/contact";
import project from "./schemas/project";
import post from "./schemas/post";
import technology from "./schemas/technology";
import videoFileType from "./schemas/videoFileType";

// Retrieve project ID and dataset from environment variables for security and flexibility.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// Ensure required environment variables are set. The Studio cannot function without them.
if (!projectId || !dataset) {
  throw new Error(
    `Sanity project ID and/or dataset not found. Check your .env.local file.`
  );
}

export default defineConfig({
  // Define the base path for the Sanity Studio within the Next.js app.
  // This must match the route created in Next.js (see Step 1c).
  basePath: "/studio",

  projectId: projectId, // Sanity project identifier
  dataset: dataset, // Target dataset (e.g., 'production', 'development')

  // Register all the content schemas that the Studio will manage.
  schema: {
    types: [
      // Document types first
      author,
      category,
      contact,
      project,
      post,
      technology,
      // Then object types and other utility types
      blockContent,
      videoFileType,
    ],
  },

  // Load the essential plugins for the Studio interface.
  plugins: [
    deskTool(), // Provides the primary content management interface
    visionTool(), // Adds a tool to write and test GROQ queries
  ],
});
