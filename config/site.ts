// config/site.ts

// Self-comment: Central configuration file for site-wide constants and settings.

export const siteConfig = {
  // --- Personal Information ---
  name: "Tomislav Sertic",
  title: "Tomislav Sertic - Software Developer",
  description:
    "Portfolio of Tomislav Sertic, a versatile software developer based in Zagreb, Croatia, specializing in building modern applications.",
  author: "Tomislav Sertic",
  email: "tsertic5@gmail.com",

  // --- Social Links ---
  socials: {
    linkedin: "https://www.linkedin.com/in/tomislav-sertic",
    github: "https://github.com/tsertic",
    instagram: "https://www.instagram.com/tsertic5/",
  },

  // --- Navigation Links ---
  navLinks: [
    { name: "Home", href: "#intro" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "/blog" }, // Link to the blog page
    { name: "Contact", href: "#contact" },
  ],

  // --- Other Constants ---
};

export type SiteConfig = typeof siteConfig;
