import { defineCollection, z } from "astro:content";

export const meetingTypeSchema = z.enum(["SLUUG", "STLLUG"]);
export type MeetingType = z.infer<typeof meetingTypeSchema>;

export const linkSchema = z.object({
    linkText: z
        .string()
        .optional()
        .describe("The display name of the link. Example: 'whereis man page'"),
    url: z
        .string()
        .describe(
            "URL to the reference. Example: 'https://linux.die.net/man/1/whereis'",
        ),
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
    tweet: z.string().optional(),
});
export type Presentation = z.infer<typeof presentationSchema>;

const meetingCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            meetingDate: z
                .string()
                .transform((dayString) =>
                    transformDayToDateInCentralTime(dayString),
                ),
            meetingType: meetingTypeSchema,
            presentations: z.array(presentationSchema).min(1),
            meetupUrl: z.string().optional(),
            youtubeUrl: z.string().optional(),
            youtubeTitle: z.string().optional(),
            image: z.object({
                src: image(),
                alt: z.string(),
            }),
        }),
});

export const meetingSchema = z.object({
    meetingDate: z
        .string()
        .transform((dayString) => transformDayToDateInCentralTime(dayString)),
    meetingType: meetingTypeSchema,
    presentations: z.array(presentationSchema).min(1),
    meetupUrl: z.string().optional(),
    youtubeUrl: z.string().optional(),
    youtubeTitle: z.string().optional(),
});
export type Meeting = z.infer<typeof meetingSchema> & {
    image: {
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
    };
};

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

function transformDayToDateInCentralTime(date: string): Date {
    if (isDateDuringDaylightSavingsTime(new Date(date))) {
        return new Date(`${date}T18:30:00.000-0500`);
    }
    return new Date(`${date}T18:30:00.000-0600`);
}

/**
 * This function is used to determine if the date supplied is during daylight savings time.
 *
 * @param date The date to check
 * @returns true if the date is during daylight savings time.
 */
function isDateDuringDaylightSavingsTime(date: Date): boolean {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    return (
        date.getTimezoneOffset() <
        Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
    );
}

export const mediaSchema = z.object({
    displayName: z.string(),
    relativeFilePath: z.string(),
    fileSizeBytes: z.number(),
});
export type Media = z.infer<typeof mediaSchema>;
