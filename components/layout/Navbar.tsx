"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

// Helper function to determine if a navigation link is currently active
const isActive = (currentPath: string, targetHref: string): boolean => {
  if (targetHref.startsWith("/#")) {
    return currentPath === "/";
  }
  // For regular links: active if exact match or nested route
  return (
    currentPath === targetHref ||
    (targetHref !== "/" && currentPath.startsWith(targetHref))
  );
};

const Navbar = () => {
  // State for mobile menu and scroll tracking
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll position to update navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check position on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Self-comment: Handles both in-page section scrolling and cross-page navigation
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") || href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.substring(2);

      // If on homepage, smoothly scroll to section
      if (pathname === "/") {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.location.href = `/${href}`;
      } else {
        // If on different page, navigate to homepage with hash
        window.location.href = `/${href}`;
      }
      setIsMobileMenuOpen(false);
    } else {
      // For regular page links, just close the mobile menu
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out ${
        hasScrolled
          ? "bg-white led-glow "
          : isMobileMenuOpen
            ? "bg-white shadow-md"
            : "bg-transparent shadow-none"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Site Logo/Name */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900   hover:text-indigo-600   transition-colors"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium transition-colors ${
                  isActive(pathname, link.href)
                    ? "text-indigo-600  "
                    : "text-gray-600   hover:text-gray-900  "
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-md text-gray-600   hover:text-gray-900   hover:bg-gray-100   focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div
        className="md:hidden absolute top-full left-0 right-0 bg-white   shadow-lg overflow-hidden border-t border-gray-100  "
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={`mobile-${link.name}`}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(pathname, link.href)
                  ? "bg-indigo-50   text-indigo-700  "
                  : "text-gray-700   hover:bg-gray-50   hover:text-gray-900  "
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
