// app/blog/[slug]/page.tsx
import React from "react";
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity.queries";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { CustomPortableTextComponents } from "@/components/sanity/CustomPortableTextComponents";
import { formatDate } from "@/lib/utils";
import type { PortableTextBlock } from "sanity";

// Definicija oblika parametara nakon što se Promise razriješi
type PageParams = {
  slug: string;
};

// Tip za props koji Next.js očekuje (params kao Promise)
type PageProps = {
  params: Promise<PageParams>;
  // searchParams?: { [key: string]: string | string[] | undefined }; // Možeš dodati i ovo ako koristiš searchParams
};

// Za Static Site Generation - definira koje rute pre-renderirati
export async function generateStaticParams(): Promise<PageParams[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generira metadata za stranicu (naslov, opis, itd.)
export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  // Await da dobiješ stvarne parametre iz Promise-a

  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: `Post Not Found | ${siteConfig.name}`,
      description: "The requested blog post could not be found.",
    };
  }

  const title = `${post.title || "Untitled Post"} | ${siteConfig.name}`;

  // Ekstrakcija opisa iz prvog paragrafa sadržaja
  let description = siteConfig.description;
  if (post.body && Array.isArray(post.body) && post.body.length > 0) {
    const firstBlock = post.body[0] as PortableTextBlock;
    if (
      firstBlock?._type === "block" &&
      firstBlock.children &&
      Array.isArray(firstBlock.children) &&
      firstBlock.children.length > 0
    ) {
      const firstSpan = firstBlock.children[0];
      if (firstSpan?._type === "span" && typeof firstSpan.text === "string") {
        description = `${firstSpan.text.substring(0, 155)}...`;
      }
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.mainImageUrl ? [{ url: post.mainImageUrl }] : [],
    },
  };
}

// Komponenta za blog post stranicu
export default async function BlogPostPage({ params }: PageProps) {
  // Koristi novi PageProps tip
  // Await da dobiješ stvarne parametre iz Promise-a
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  // Prikaži 404 stranicu ako post nije pronađen
  if (!post) {
    notFound();
  }

  const authorPlaceholderImage = "/images/placeholder-author.png";

  return (
    <main className="bg-white min-h-screen">
      <article className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        {/* Post Header Section */}
        <header className="mb-8 md:mb-12 border-b pb-8 border-gray-100">
          <div className="mb-6">
            <Link
              href="/blog"
              className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
            >
              ← Back to Blog
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
            {post.title || "Untitled Post"}
          </h1>

          {/* Author and date metadata */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            {post.author && (
              <div className="flex items-center gap-2">
                <Image
                  src={post.author.imageUrl || authorPlaceholderImage}
                  alt={post.author.name || "Author"}
                  width={28}
                  height={28}
                  className="rounded-full bg-gray-100 object-cover"
                />
                <span className="font-medium text-gray-700">
                  {post.author.name}
                </span>
              </div>
            )}
            {post.author && post.publishedAt && (
              <span className="hidden md:inline">•</span>
            )}
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="whitespace-nowrap">
                {formatDate(post.publishedAt)}
              </time>
            )}
          </div>

          {/* Post Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories.map((category) =>
                category?._id ? (
                  <span
                    key={category._id}
                    className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {category.title}
                  </span>
                ) : null
              )}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.mainImageUrl && (
          <div className="mb-8 md:mb-12 rounded-lg overflow-hidden shadow-md bg-gray-100">
            <Image
              src={post.mainImageUrl}
              alt={post.altText || post.title || "Blog post main image"}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              priority // Održava 'priority' ako je slika iznad folda
            />
          </div>
        )}

        {/* Post Content */}
        {post.body ? (
          <div className="prose prose-indigo lg:prose-lg max-w-none">
            <PortableText
              value={post.body}
              components={CustomPortableTextComponents}
            />
          </div>
        ) : (
          <p className="text-gray-500 italic">
            This post currently has no content.
          </p>
        )}
      </article>
    </main>
  );
}
