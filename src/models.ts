import type { ImageMetadata } from "astro";

export interface Presentation {
  title: string;
  presenter: string;
  tags: string[];
}

export type MeetingType = "SLUUG" | "STLLUG";

export interface Image {
  src: ImageMetadata;
  alt: string;
}
