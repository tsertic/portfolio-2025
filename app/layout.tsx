// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Možeš promijeniti font ako želiš
import "./globals.css";

// Uvozimo font, npr. Inter iz Google Fonts
const inter = Inter({ subsets: ["latin"] });

// Metadata za SEO i tab u browseru
export const metadata: Metadata = {
  title: "Tomislav Sertic - Portfolio", // Stavi svoj naslov
  description:
    "Full-Stack Developer s fokusom na Front-end. Pogledaj moje projekte.", // Stavi svoj opis
};

// Glavni layout koji omata sve stranice
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Vraćamo osnovnu HTML strukturu
  return (
    <html lang="en">
      {/* Postavimo jezik na hrvatski */}
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        {/* Osnovni stilovi za body, možeš mijenjati boje */}
        {/* Ovdje će Next.js ubaciti sadržaj stranice (page.tsx) */}
        {children}
      </body>
    </html>
  );
}
