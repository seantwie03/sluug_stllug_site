import { z } from "zod";

export const meetingTypeSchema = z.enum(["SLUUG", "STLLUG"]);
export const linkSchema = z.object({
    url: z
        .string()
        .describe(
            "URL to the reference. Example: https://linux.die.net/man/1/whereis"
        ),
    linkText: z
        .string()
        .optional()
        .describe("The name of the link. Example: whereis man page"),
});
export const imageSchema = z.object({
    src: z.string(),
    alt: z.string(),
});
export const presentationSchema = z.object({
    title: z.string(),
    presenterNames: z.array(z.string()),
    tags: z.array(z.string()),
    abstract: z.string(),
    references: z.array(linkSchema).optional(),
    tweets: z.array(z.string()).optional(),
});
export const meetingSchema = z.object({
    meetingType: meetingTypeSchema,
    meetingDate: z.string(),
    main: presentationSchema,
    base: presentationSchema.optional(),
    youtubeUrl: z.string().optional(),
    youtubeTitles: z.array(z.string()).optional(),
    meetupUrl: z.string().optional(),
    image: imageSchema.optional(),
});

export type MeetingType = z.infer<typeof meetingTypeSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Presentation = z.infer<typeof presentationSchema>;
export type Meeting = z.infer<typeof meetingSchema>;
export type Presenter = z.infer<typeof presentationSchema>;
