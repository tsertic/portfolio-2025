// app/blog/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import BlogPageCard from "@/components/shared/BlogPageCard";

import { BlogListPagePost } from "@/lib/sanity.queries";

import { getAllPosts } from "@/lib/sanity.queries";

// --- Blog List Page Component ---
const BlogListPageClient = () => {
  // --- State Variables ---
  // Store all fetched posts
  const [allPosts, setAllPosts] = useState<BlogListPagePost[]>([]);
  // Store the current search term
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Track loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Track potential fetch errors
  const [error, setError] = useState<string | null>(null);

  // --- Data Fetching Effect ---
  // Fetch data on the client side when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("[Blog List Page Client] Fetching posts...");
        const posts = await getAllPosts(); // Fetch posts client-side
        console.log(
          `[Blog List Page Client] Fetched ${posts?.length ?? 0} posts.`
        );
        setAllPosts(posts || []); // Set posts or empty array if fetch fails/returns null
      } catch (err: unknown) {
        console.error("[Blog List Page Client] Error fetching posts:", err);
        const errorMessage =
          typeof err === "object" && err !== null && "message" in err
            ? String(err.message)
            : "Failed to load posts.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means run once on mount

  // --- Filtered Posts Calculation ---
  // useMemo recalculates only when searchTerm or allPosts changes
  const filteredPosts = useMemo(() => {
    if (!searchTerm) {
      return allPosts; // Return all posts if search term is empty
    }
    // Filter posts based on search term (case-insensitive title match)
    return allPosts.filter((post) =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allPosts, searchTerm]); // Dependencies for recalculation

  // --- Event Handler for Search Input ---
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // --- Render Logic ---
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Page Header */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of articles about development, technology, and maybe
            some random thoughts.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Search Filter Input */}
        <div className="mb-10 md:mb-12 max-w-xl mx-auto">
          <label htmlFor="search-blog" className="sr-only">
            Search Posts
          </label>
          <input
            type="text"
            id="search-blog"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search posts by title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 text-gray-500">
            Loading posts...
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-16 text-red-600">
            <p>Error loading posts: {error}</p>
            <p>Please try refreshing the page.</p>
          </div>
        )}

        {/* Blog Post Grid / No Results Message */}
        {!isLoading && !error && (
          <>
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Use the new BlogPageCard */}
                {filteredPosts.map((post, index) => (
                  <BlogPageCard key={post._id} post={post} index={index} />
                ))}
              </div>
            ) : (
              // Message when no posts match the search or none exist
              <div className="text-center py-16 text-gray-500">
                <p>
                  {searchTerm
                    ? `No posts found matching "${searchTerm}".`
                    : "No blog posts published yet. Come back soon!"}
                </p>
              </div>
            )}
          </>
        )}
        {/* Optional: Pagination */}
      </div>
    </main>
  );
};

export default BlogListPageClient;
