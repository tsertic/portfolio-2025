// lib/sanity.queries.ts
import { groq } from "next-sanity"; // Helper for syntax highlighting
import { sanityClient } from "./sanity"; // Import configured client and URL builder
import type { Technology, Category, Post, Author } from "./types"; // Import base types
import type { Slug, PortableTextBlock } from "sanity";
// --- Specific Query Result Types ---

// Self-comment: Defines the exact data structure returned by the 'projectsQuery'.
// This improves type safety by matching the function's return type to the query projection.
export type QueryResultProject = {
  _id: string;
  // _type: 'project'; // Not explicitly selected, but known
  createdAt?: string;
  title?: string;
  slug?: Slug;
  mainImageUrl?: string | null; // Direct URL from asset
  altText?: string | null; // Alt text from image field
  previewVideoUrl?: string | null; // Direct URL from asset
  repository?: string;
  live?: string;
  priority?: number;
  author?: {
    // Nested author data
    name?: string;
    imageUrl?: string | null;
  };
  technologies?: Array<{
    // Array of nested technology data
    _id: string;
    title?: string;
  }>;
  categories?: Array<{
    // Array of nested category data
    _id: string;
    title?: string;
  }>;
  body?: PortableTextBlock[]; // Rich text content
};

// Self-comment: Defines the exact data structure returned by the 'recentPostsQuery'.
export type QueryResultPost = {
  _id: string;
  // _type: 'post'; // Not explicitly selected, but known
  publishedAt?: string;
  title?: string;
  slug?: Slug;
  mainImageUrl?: string | null;
  altText?: string | null;
  author?: {
    name?: string;
  };
  excerpt?: string | null; // Plain text excerpt generated from body
};

// --- Project Queries ---

// Self-comment: GROQ query to fetch all documents of type 'project'.
// Orders by 'priority' ascending, then 'createdAt' descending.
// Projects specific fields and expands references for author, technologies, and categories.
const projectsQuery = groq`
*[_type == "project"] | order(priority desc, createdAt desc) {
  _id,                         // Select the document ID
  createdAt,                   // Select creation timestamp
  title,                       // Select project title
  slug,                        // Select project slug
  "mainImageUrl": mainImage.asset->url, // Project image URL
  "altText": mainImage.alt,             // Project image alt text
  "previewVideoUrl": previewVideo.asset->url, // Project video URL
  repository,                  // Select repository URL
  live,                        // Select live URL
  priority,                    // Select priority number
  author->{                    // Dereference and select author fields
    name,
    "imageUrl": image.asset->url
  },
  technologies[]->{            // Dereference and select technology fields
    _id,
    title
  },
  categories[]->{              // Dereference and select category fields
    _id,
    title
  },
  body                         // Select the rich text body content
}`;

// Self-comment: Asynchronously fetches all projects using the 'projectsQuery'.
// Returns a promise resolving to an array of 'QueryResultProject' objects.
export async function getAllProjects(): Promise<QueryResultProject[]> {
  try {
    // Fetch data, explicitly typing the expected result based on the query.
    const projects =
      await sanityClient.fetch<QueryResultProject[]>(projectsQuery);
    // console.log("Fetched Projects:", projects); // Uncomment for debugging
    return projects;
  } catch (error) {
    // Log error for server-side visibility. Avoid exposing details to the client.
    console.error("Failed to fetch projects:", error);
    // Return an empty array to prevent breaking the UI on fetch failure.
    return [];
  }
}

// --- Post Queries ---

// Self-comment: GROQ query to fetch the 3 most recent documents of type 'post'.
// Orders by 'publishedAt' descending.
// Projects fields suitable for a preview card, including a generated excerpt.
const recentPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc) [0...3] { // Slicing for the first 3 results
  _id,
  publishedAt,
  title,
  slug,
  "mainImageUrl": mainImage.asset->url,
  "altText": mainImage.alt,
  author->{ name },
  // Use pt::text function to extract plain text from the first block of the body
  "excerpt": pt::text(body[0]),
}`;

// Self-comment: Asynchronously fetches the 3 most recent posts using 'recentPostsQuery'.
// Returns a promise resolving to an array of 'QueryResultPost' objects.
export async function getRecentPosts(): Promise<QueryResultPost[]> {
  try {
    // Fetch data, explicitly typing the expected result.
    const posts = await sanityClient.fetch<QueryResultPost[]>(recentPostsQuery);
    // console.log("Fetched Recent Posts:", posts); // Uncomment for debugging
    return posts;
  } catch (error) {
    console.error("Failed to fetch recent posts:", error);
    return []; // Return empty array on error
  }
}

// --- Technology & Category Queries ---

// Self-comment: GROQ query to fetch all documents of type 'technology'.
// Orders by title ascending. Selects fields needed for filtering or display.
const technologiesQuery = groq`
*[_type == "technology"] | order(title asc) {
  _id,
  title,
  description
}`;

// Self-comment: Asynchronously fetches all technologies.
// Returns a promise resolving to an array of 'Technology' objects (using the imported type).
export async function getAllTechnologies(): Promise<Technology[]> {
  try {
    // Fetch data, using the 'Technology' type from './types'.
    const technologies =
      await sanityClient.fetch<Technology[]>(technologiesQuery);
    return technologies;
  } catch (error) {
    console.error("Failed to fetch technologies:", error);
    return []; // Return empty array on error
  }
}

// Self-comment: GROQ query to fetch all documents of type 'category'.
// Orders by title ascending. Selects fields needed for filtering or display.
const categoriesQuery = groq`
*[_type == "category"] | order(title asc) {
  _id,
  title,
  description
}`;

// Self-comment: Asynchronously fetches all categories.
// Returns a promise resolving to an array of 'Category' objects (using the imported type).
export async function getAllCategories(): Promise<Category[]> {
  try {
    // Fetch data, using the 'Category' type from './types'.
    const categories = await sanityClient.fetch<Category[]>(categoriesQuery);
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return []; // Return empty array on error
  }
}

// --- Future Queries Placeholder ---
// Self-comment: Add functions here to fetch single documents by slug,
// specific author details, or other data as needed for detail pages or components.
// Example:
// export async function getProjectBySlug(slug: string): Promise<QueryResultProject | null> { ... }
// export async function getPostBySlug(slug: string): Promise<QueryResultPost | null> { ... }
// --- New Query Result Type for Blog List Page ---
// Self-comment: Type for posts listed on the main blog page. Includes excerpt.
export type BlogListPagePost = Pick<
  Post,
  "_id" | "title" | "slug" | "publishedAt"
> & {
  mainImageUrl?: string | null;
  altText?: string | null;
  author?: { name?: string };
  excerpt?: string | null; // Generated excerpt
};

// --- New Query Result Type for Single Blog Post Page ---
// Self-comment: Type for a single, fully detailed blog post. Includes full body and references.
export type SinglePost = Pick<
  Post,
  "_id" | "title" | "slug" | "publishedAt" | "body"
> & {
  mainImageUrl?: string | null;
  altText?: string | null;
  author?: Pick<Author, "name"> & { imageUrl?: string | null }; // Include author image URL
  categories?: Array<Pick<Category, "_id" | "title">>;
};

const allPostsQuery = groq`
*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  "mainImageUrl": mainImage.asset->url,
  "altText": mainImage.alt,
  author->{ name },
  "excerpt": pt::text(body[0]), // Generate excerpt from first body block
}`;

// Self-comment: Function to fetch all posts for the blog list page.
export async function getAllPosts(): Promise<BlogListPagePost[]> {
  try {
    const posts = await sanityClient.fetch<BlogListPagePost[]>(allPostsQuery);
    return posts;
  } catch (error) {
    console.error("Failed to fetch all posts:", error);
    return [];
  }
}

// Self-comment: Query to fetch a single post by its slug. Includes full body and expanded references.
const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  "mainImageUrl": mainImage.asset->url,
  "altText": mainImage.alt,
  author->{
    name,
    "imageUrl": image.asset->url // Fetch author image too
   },
  categories[]->{ // Fetch categories for the post
    _id,
    title
  },
  body // Fetch the full Portable Text body
}`;

// Self-comment: Function to fetch a single post by its slug.
// Returns the post object or null if not found.
export async function getPostBySlug(slug: string): Promise<SinglePost | null> {
  if (!slug) return null; // Return null if slug is missing
  try {
    // Pass the slug as a parameter to the query
    const post = await sanityClient.fetch<SinglePost | null>(postBySlugQuery, {
      slug,
    });
    return post;
  } catch (error) {
    console.error(`Failed to fetch post with slug "${slug}":`, error);
    return null; // Return null on error
  }
}

// Self-comment: Query to fetch slugs of all published posts. Used for generateStaticParams.
const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

// Self-comment: Function to fetch all post slugs.
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(postSlugsQuery);
    return slugs || [];
  } catch (error) {
    console.error("Failed to fetch post slugs:", error);
    return [];
  }
}
