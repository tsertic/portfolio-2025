// lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Provjeri jesu li varijable postavljene, inače baci grešku
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
// const token = process.env.SANITY_API_READ_TOKEN // Ako će ti trebati token

if (!projectId || !dataset || !apiVersion) {
  throw new Error(
    "Ajoj! Fali ti Sanity project ID, dataset ili apiVersion u .env.local"
  );
}

// Ovo je naš glavni klijent za spajanje na Sanity
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: typeof document !== "undefined", // Korištenje CDN-a je brže, ali može kasniti s najnovijim podacima. Na serveru (SSR/ISR) ne koristimo CDN, u browseru da.
  // token: token, // Odkomentiraj ako koristiš token
  // perspective: 'published', // Može biti 'published', 'previewDrafts', 'raw'
});

// Helper funkcija za generiranje URL-ova za slike iz Sanityja
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  // Mala funkcija da lakše dobijemo URL od slike
  return builder.image(source);
}
