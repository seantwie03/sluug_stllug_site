import type { ImageMetadata } from "astro";
import type { z } from "astro/zod";
import type {
    MeetingSchemaZod,
    MeetingTypeZod,
    PresentationZod,
    PresenterSchemaZod,
} from "@/content/config";

export type MeetingType = z.infer<typeof MeetingTypeZod>;
export type Presentation = z.infer<typeof PresentationZod>;
export type Meeting = z.infer<typeof MeetingSchemaZod>;
export type Presenter = z.infer<typeof PresenterSchemaZod>;

export interface Image {
    src: ImageMetadata;
    alt: string;
}
