import { defineCollection, z } from "astro:content";

export const meetingTypeSchema = z.enum(["SLUUG", "STLLUG"]);
export type MeetingType = z.infer<typeof meetingTypeSchema>;

export const linkSchema = z.object({
    url: z
        .string()
        .describe(
            "URL to the reference. Example: 'https://linux.die.net/man/1/whereis'",
        ),
    linkText: z
        .string()
        .optional()
        .describe("The display name of the link. Example: 'whereis man page'"),
});
export type Link = z.infer<typeof linkSchema>;

export const imageSchema = z.object({
    src: z.string(),
    alt: z.string(),
});
export type Image = z.infer<typeof imageSchema>;

export const presentationSchema = z.object({
    title: z.string(),
    presenterNames: z.array(z.string()),
    abstract: z.string(),
    references: z.array(linkSchema).optional(),
    tags: z.array(z.string()),
    tweets: z.array(z.string()).optional(),
});
export type Presentation = z.infer<typeof presentationSchema>;

export const meetingSchema = z.object({
    meetingDate: z.coerce.date(),
    meetingType: meetingTypeSchema,
    presentations: z.array(presentationSchema).min(1),
    meetupUrl: z.string().optional(),
    youtubeUrl: z.string().optional(),
    youtubeTitles: z.array(z.string()).optional(),
});
export type Meeting = z.infer<typeof meetingSchema> & {
    images: {
        src: {
            src: string;
            width: number;
            height: number;
            format:
                | "png"
                | "jpg"
                | "jpeg"
                | "tiff"
                | "webp"
                | "gif"
                | "svg"
                | "avif";
        };
        alt: string;
    }[];
};

const meetingCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            meetingDate: z.coerce.date(),
            meetingType: meetingTypeSchema,
            presentations: z.array(presentationSchema).min(1),
            meetupUrl: z.string().optional(),
            youtubeUrl: z.string().optional(),
            youtubeTitles: z.array(z.string()).optional(),
            images: z.array(
                z.object({
                    src: image(),
                    alt: z.string(),
                }),
            ),
        }),
});

export const presenterSchema = z.object({
    presenterName: z
        .string()
        .describe(
            "The presenter's name formatted how it should be displayed on the website. Example: George R.R. Martin",
        ),
    lastUpdated: z
        .date()
        .describe("The date when the Presenter's file was last updated."),
});
export type Presenter = z.infer<typeof presenterSchema>;

const presenterCollection = defineCollection({
    type: "content",
    schema: presenterSchema,
});

export const collections = {
    meetings: meetingCollection,
    presenters: presenterCollection,
};

export interface DisplayImage {
    src: ImageMetadata;
    alt: string;
}
