// components/sanity/CustomPortableTextComponents.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableTextReactComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity"; // Import urlFor helper

// Self-comment: Defining custom components to render Sanity's Portable Text blocks.
// This allows us to apply specific styling and logic to different block types.

export const CustomPortableTextComponents: Partial<PortableTextReactComponents> =
  {
    // Handling standard block types (paragraphs, headings, etc.)
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl font-bold mb-6 mt-8 text-gray-900">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-semibold mb-4 mt-6 text-gray-800">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-medium mb-3 mt-5 text-gray-700">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg font-medium mb-3 mt-4 text-gray-700">
          {children}
        </h4>
      ),
      // Default paragraph styling
      normal: ({ children }) => (
        <p className="mb-4 leading-relaxed text-gray-700 max-w-prose">
          {children}
        </p>
      ),
      // Blockquote styling
      blockquote: ({ children }) => (
        <blockquote className="pl-4 border-l-4 border-indigo-200 italic my-6 text-gray-600">
          {children}
        </blockquote>
      ),
      // Add other block styles (h5, h6, cite) if needed, similar to your example
    },

    // Handling list types
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
          {children}
        </ul>
      ),
      // Add 'number' list type if needed
      // number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    },

    // Handling list items
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      // Add 'number' if needed
      // number: ({ children }) => <li>{children}</li>,
    },

    // Handling custom block types within the 'body' array
    types: {
      // Custom image rendering using next/image and urlFor
      image: ({ value }) => {
        // Self-comment: 'value' here is the Sanity image object { asset: { _ref: ... }, alt: '...' }
        if (!value?.asset?._ref) {
          return null; // Don't render if image asset is missing
        }
        const altText = value.alt || "Decorative image"; // Use alt text from Sanity or a default

        // Use urlFor to build the image URL from the reference
        const imageUrl = urlFor(value).fit("max").auto("format").url();
        const imageWidth = value.width || 800; // Use metadata width or default
        const imageHeight =
          value.height ||
          Math.round(imageWidth / (value.aspectRatio || 16 / 9)); // Calculate height based on aspect ratio or default

        return (
          <div className="my-6 rounded-lg overflow-hidden shadow-md">
            {" "}
            {/* Added shadow */}
            <Image
              src={imageUrl}
              alt={altText}
              width={imageWidth} // Provide width for layout calculation
              height={imageHeight} // Provide height
              sizes="(max-width: 768px) 100vw, 800px" // Responsive sizes hint
              className="w-full h-auto object-cover" // Ensure image scales correctly
              loading="lazy" // Lazy load images within Portable Text
            />
            {/* Optional: Render caption if provided in Sanity schema */}
            {value.caption && (
              <p className="text-sm text-center text-gray-500 italic mt-2 px-2">
                {value.caption}
              </p>
            )}
          </div>
        );
      },
      // Add code block type
      codeBlock: ({ value }) => {
        const { code, language, filename, highlightLines } = value;

        return (
          <div className="my-6 overflow-hidden rounded-lg">
            {filename && (
              <div className="bg-gray-800 px-4 py-2 text-xs text-gray-200 font-mono flex items-center justify-between">
                <span>{filename}</span>
              </div>
            )}
            <pre className="p-4 bg-gray-900 overflow-x-auto text-sm scrollbar-thin">
              <code
                className={`language-${language || "text"} text-gray-100 font-mono`}
              >
                {code}
              </code>
            </pre>
          </div>
        );
      },
      // Add other custom types here if defined in your 'blockContent' schema
      // e.g., youtube embeds, etc.
      // youtube: ({ value }) => { ... } // If you have a youtube type
    },

    // Handling inline text decorators and annotations
    marks: {
      // Custom link rendering
      link: ({ children, value }) => {
        const href = value?.href || "";
        // Basic check if it's an external link
        const isExternal = href.startsWith("http");
        const rel = isExternal ? "noopener noreferrer" : undefined;
        const target = isExternal ? "_blank" : undefined;

        return (
          <Link
            href={href}
            rel={rel}
            target={target}
            className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors font-medium"
          >
            {children}
          </Link>
        );
      },
      // Add other marks
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-800">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      // Add inline code mark
      code: ({ children }) => (
        <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
    },
  };
