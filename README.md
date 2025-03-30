# My Portfolio Website

A modern, responsive portfolio website showcasing my work as a Full-Stack Software Developer. Built with Next.js, TypeScript, and integrated with Sanity CMS.

![Portfolio Preview- 30.03.2025](preview.gif)

## 🚀 Live Site

Visit my portfolio at: [tsertic.dev](https://tsertic.dev)

## 💻 Tech Stack

- **Frontend**: Next.js 15, TypeScript, React, Framer Motion
- **Styling**: Tailwind CSS, SCSS Modules
- **CMS**: Sanity.io
- **Deployment**: Vercel

## ✨ Features

- Responsive design that works across all devices
- Dynamic project showcase with filtering by technology
- Interactive animations using Framer Motion
- Blog section with Sanity CMS integration
- Contact form
- Optimized performance and SEO

## 🏗️ Project Structure

```
portfolio-2025/
├── app/                          # Next.js App Router directory
│   ├── blog/                     # Blog routes
│   │   ├── [slug]/               # Dynamic blog post route
│   │   ├── page.tsx              # Blog listing page
│   ├── studio/                   # Sanity Studio route
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── modals/                   # Modal components
│   │   └── ProjectDetailModal.tsx
│   ├── sanity/                   # Sanity-specific components
│   │   └── CustomPortableTextComponents.tsx
│   ├── sections/                 # Major page sections
│   │   ├── AboutSection.tsx
│   │   ├── BlogPreviewSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── IntroSection.tsx
│   │   └── ProjectsSection.tsx
│   ├── shared/                   # Shared components
│   │   ├── BackgroundAnimation.tsx
│   │   ├── BlogCard.tsx
│   │   ├── BlogPageCard.tsx
│   │   └── ProjectCard.tsx
│   ├── ui/                       # UI components
├── config/                       # Configuration
│   └── site.ts                   # Site metadata and config
├── hooks/                        # Custom React hooks
│   └── useMediaQuery.ts          # Responsive design hook
├── lib/                          # Utility functions
│   ├── sanity.queries.ts         # Sanity GROQ queries
│   ├── sanity.ts                 # Sanity client setup
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
│   ├── images/
│   ├── svg/
├── schemas/                      # Sanity schema definitions
│   ├── author.ts
│   ├── blockContent.ts
│   ├── category.ts
│   ├── contact.ts
│   ├── post.ts
│   ├── project.ts
│   ├── technology.ts
│   └── videoFileType.ts
```

## 🧰 About Me

I'm a Full-Stack Software Developer from Zagreb, Croatia 🇭🇷, specializing in building high-performance web applications, robust backend systems, and effective digital solutions. With 5 years of experience, I focus on developing scalable, efficient, and user-friendly software.

### Core Skills

- **Languages**: JavaScript/TypeScript, C#, Python
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express, ASP.NET
- **Databases**: SQL, MongoDB, Sanity
- **Other**: RESTful APIs, AI integration

### Current Role

Software Developer at Arctis d.o.o (Archibus IWMS Representatives), where I handle server setup, database integration, and developing custom features using JavaScript and other technologies.

### Beyond Coding

When I'm not coding, I enjoy:

- Playing basketball (Pregrada Barbari - CroHoops)
- Cycling and hiking
- Chess
- Spending time with family and my dog

## 📝 Blog

I occasionally write about web development, technology trends, and my experiences in the field. Check out my latest articles in the [Blog section](https://your-portfolio-url.com/blog).

## 📞 Contact

Feel free to reach out if you're interested in collaborating or have any questions. The best way to connect is through:

- Email: tsertic5@gmail.com
- LinkedIn: [Tomislav Sertic](https://www.linkedin.com/in/tomislav-sertic)

## 🛠️ Running the Project Locally

```bash
# Clone the repository
git clone https://github.com/tsertic/portfolio-2025

# Navigate to the project directory
cd portfolio

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with the necessary Sanity credentials

# Start the development server
npm run dev
```

Open [http://localhost:4545](http://localhost:4545) in your browser to see the result.

### Sanity Studio

This project includes Sanity Studio for content management. To access the studio:

1. Run the development server (`npm run dev`)
2. Visit [http://localhost:4545/studio](http://localhost:4545/studio)
