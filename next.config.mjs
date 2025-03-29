// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for Next.js Image Optimization.
  devIndicators: false,
  images: {
    // Allow images hosted on the Sanity CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        // Construct the path using the Sanity Project ID from environment variables.
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
      },
    ],
  },

  // **Correction:** Moved `serverExternalPackages` outside the 'experimental' block.
  // This configuration helps Next.js correctly handle specific packages
  // when used within Server Components, potentially preventing build or runtime errors.
  serverExternalPackages: ["@sanity/client", "sanity-plugin-mux-input"], // Add 'sanity-plugin-mux-input' if using the Mux plugin

  // The 'experimental' block might still be needed for other features in the future,
  // but 'serverComponentsExternalPackages' is no longer part of it.
  experimental: {
    // Any other experimental flags would go here.
    // If empty, you can remove the 'experimental' key entirely.
  },

  // If using styled-components, uncommenting this might help resolve potential conflicts,
  // as Sanity Studio uses it internally.
  // compiler: {
  //   styledComponents: true,
  // },
};

export default nextConfig;
