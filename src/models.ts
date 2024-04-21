import type { ImageMetadata } from "astro";

export interface Presentation {
    title: string;
    presenterNames: string[];
    tags: string[];
}

export type MeetingType = "SLUUG" | "STLLUG";

export interface Image {
    src: ImageMetadata;
    alt: string;
}
