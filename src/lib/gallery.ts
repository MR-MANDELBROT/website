import type { ImageMetadata } from "astro";

export interface Category {
  slug: string;
  title: string;
  /** Dateiname (in src/photos/<slug>/) für das Titelbild der Übersicht. */
  cover?: string;
}

// Anzeige-Reihenfolge + Titel der Kategorien.
export const categories: Category[] = [
  {
    slug: "professional",
    title: "Professional Work",
  },
  {
    slug: "portrait-street",
    title: "Portrait & Street",
    cover: "DSCF7444.jpg",
  },
  {
    slug: "landscape",
    title: "Landscape",
    cover: "DSCF6395-Edit-2.jpg",
  },
  {
    slug: "wildlife",
    title: "Wildlife",
    cover: "DSCF5017-2.jpg",
  },
];

// Alle Bilder eager als optimierbare ImageMetadata laden.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../photos/**/*.{jpg,JPG,jpeg,JPEG}",
  { eager: true },
);

export interface Photo {
  img: ImageMetadata;
  file: string;
  category: string;
}

function photosFor(slug: string): Photo[] {
  const prefix = `../photos/${slug}/`;
  return Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, mod]) => ({
      img: mod.default,
      file: path.slice(prefix.length),
      category: slug,
    }))
    .sort((a, b) => a.file.localeCompare(b.file, "en", { numeric: true }));
}

export function getPhotos(slug: string): Photo[] {
  return photosFor(slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Cover image of a category: the configured one, else the first photo. */
export function coverFor(slug: string): ImageMetadata | undefined {
  const photos = photosFor(slug);
  const cat = getCategory(slug);
  if (cat?.cover) {
    const match = photos.find((p) => p.file === cat.cover);
    if (match) return match.img;
  }
  return photos[0]?.img;
}
