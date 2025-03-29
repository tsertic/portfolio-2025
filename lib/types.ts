// lib/types.ts
import type { Image, Slug, PortableTextBlock, FileAsset } from "sanity"; // Import Sanity's built-in types

// Base interface for Sanity documents containing common fields
// Self-comment: A helper type to avoid repeating _id, _type, _createdAt, _rev, _updatedAt
interface SanityBase {
  _id: string;
  _type: string;
  _createdAt: string;
  _rev: string;
  _updatedAt: string;
}

// Interface for the Author schema
// Self-comment: Defines the structure for author data retrieved from Sanity.
export interface Author extends SanityBase {
  _type: "author";
  name?: string; // Optional because it might not be projected in all queries
  slug?: Slug;
  image?: Image & { alt?: string }; // Image with an optional alt field
  bio?: PortableTextBlock[]; // Array of Portable Text blocks for the bio
}

// Interface for the Category schema
// Self-comment: Structure for category data.
export interface Category extends SanityBase {
  _type: "category";
  title?: string;
  description?: string;
}

// Interface for the Technology schema
// Self-comment: Structure for technology data.
export interface Technology extends SanityBase {
  _type: "technology";
  title?: string;
  description?: string;
}

// Interface for the custom Video File type
// Self-comment: Describes the structure of the video file asset with additional properties.
export interface VideoFile extends FileAsset {
  // Inherits fields like 'url', 'originalFilename', 'mimeType', etc. from FileAsset
  // Adding at least one custom property to fix the ESLint error
  customThumb?: string; // Optional thumbnail URL specific to this video
}

// Interface for the Project schema
// Self-comment: Defines the detailed structure for project data. References are initially just references.
export interface Project extends SanityBase {
  _type: "project";
  title?: string;
  slug?: Slug;
  author?: SanityReference; // Reference to an Author document
  mainImage?: Image & { alt?: string };
  previewVideo?: {
    asset?: SanityReference; // Reference to the video file asset
  };
  technologies?: SanityReference[]; // Array of references to Technology documents
  categories?: SanityReference[]; // Array of references to Category documents
  createdAt?: string; // ISO date string
  repository?: string; // URL
  live?: string; // URL
  priority?: number;
  body?: PortableTextBlock[]; // Portable Text content for the project details
}

// Interface for the Post schema
// Self-comment: Structure for blog post data.
export interface Post extends SanityBase {
  _type: "post";
  title?: string;
  slug?: Slug;
  author?: SanityReference;
  mainImage?: Image & { alt?: string };
  categories?: SanityReference[];
  publishedAt?: string; // ISO date string
  body?: PortableTextBlock[];
}

// Interface for the Contact Message schema
// Self-comment: Structure for contact messages (though likely not displayed on the frontend).
export interface ContactMessage extends SanityBase {
  _type: "contact";
  dateRecived?: string;
  name?: string;
  email?: string;
  message?: string;
}

// Helper type for Sanity references
// Self-comment: Represents Sanity's reference objects.
export type SanityReference = {
  _ref: string;
  _type: "reference";
  // Optionally, we can add _key if it's within an array, but _ref is the main part
};

// --- Expanded Types for Queries ---
// Sometimes queries will fetch expanded data (e.g., author details within a project).
// We can define types for these expanded structures if needed, or use TypeScript's utility types.

// Example: Project with expanded author, categories, and technologies
// Self-comment: This type represents a project after resolving the references in a query.
export interface ProjectExpanded
  extends Omit<
    Project,
    "author" | "categories" | "technologies" | "previewVideo"
  > {
  author?: Author; // Author is now the full Author object
  categories?: Category[]; // Categories are now an array of full Category objects
  technologies?: Technology[]; // Technologies are now an array of full Technology objects
  previewVideo?: {
    asset?: VideoFile; // Video asset details are included
  };
  // We might also want the image URL pre-calculated
  mainImageUrl?: string | null;
  previewVideoUrl?: string | null;
}

// Example: Post with expanded author and categories
// Self-comment: Represents a blog post with resolved references.
export interface PostExpanded extends Omit<Post, "author" | "categories"> {
  author?: Author;
  categories?: Category[];
  mainImageUrl?: string | null;
  // Maybe an excerpt generated from the body
  excerpt?: string;
}
