import React from "react";
import Link from "next/link";
import BlogCard from "../shared/BlogCard";
import { getRecentPosts } from "@/lib/sanity.queries";

const BlogPreviewSection = async () => {
  // Self-comment: Fetch the 3 most recent blog posts directly on the server.
  const recentPosts = await getRecentPosts();

  return (
    <section
      id="blog-preview"
      className="w-full py-16 md:py-24 lg:py-32 border-b border-gray-200 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
          Latest Blog Posts
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Check out some of my recent thoughts and findings.
        </p>

        {/* Blog Post Grid */}
        {recentPosts && recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* Self-comment: Map over fetched posts and render BlogCard for each. */}
            {recentPosts.map((post, index) => (
              <BlogCard key={post._id} post={post} index={index} />
            ))}
          </div>
        ) : (
          // Self-comment: Display a message if no posts are found.
          <div className="text-center py-10 text-gray-500 mb-12">
            No recent blog posts found. Stay tuned!
          </div>
        )}

        <div className="text-center">
          <Link
            href="/blog" // Link to the future main blog page
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
