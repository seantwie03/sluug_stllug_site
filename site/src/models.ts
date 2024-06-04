import type { ImageMetadata } from "astro";
import type { z } from "astro/zod";
import type {
    LinkZod,
    MeetingZod,
    MeetingTypeZod,
    PresentationZod,
    PresenterZod,
} from "@/content/config";

export type MeetingType = z.infer<typeof MeetingTypeZod>;
export type Link = z.infer<typeof LinkZod>;
export type Presentation = z.infer<typeof PresentationZod>;
export type Meeting = z.infer<typeof MeetingZod>;
export type Presenter = z.infer<typeof PresenterZod>;

export interface Image extends ImageMetadata {
    alt: string;
}
