// components/layout/Footer.tsx
import React from "react";
import { siteConfig } from "@/config/site"; // Import site config for name

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 md:py-8 mt-16 md:mt-24 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 ">
          {/* Display copyright notice with current year and site name */}©{" "}
          {currentYear} {siteConfig.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
