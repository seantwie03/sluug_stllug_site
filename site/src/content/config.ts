import { defineCollection, z } from "astro:content";

export const MeetingTypeZod = z.enum(["SLUUG", "STLLUG"]);
export const LinkZod = z.object({
    url: z
        .string()
        .describe(
            "URL to the reference. Example: https://linux.die.net/man/1/whereis",
        ),
    linkText: z
        .string()
        .optional()
        .describe("The name of the link. Example: whereis man page"),
});
export const ImageZod = z.object({
    src: z.string(),
    alt: z.string(),
});
export const PresentationZod = z.object({
    title: z.string(),
    presenterNames: z.array(z.string()),
    tags: z.array(z.string()),
    abstract: z.string(),
    references: z.array(LinkZod).optional(),
    tweets: z.array(z.string()).optional(),
});
export const MeetingZod = z.object({
    meetingType: MeetingTypeZod,
    meetingDate: z.date(),
    main: PresentationZod,
    base: PresentationZod.optional(),
    youtubeUrl: z.string().optional(),
    youtubeTitles: z.array(z.string()).optional(),
    meetupUrl: z.string().optional(),
    image: ImageZod.optional(),
});

const meetingCollection = defineCollection({
    type: "data",
    schema: MeetingZod,
});

export const PresenterZod = z.object({
    presenterName: z
        .string()
        .describe(
            "The presenter's name formatted how it should be displayed on the website. Example: George R.R. Martin",
        ),
    lastUpdated: z
        .date()
        .describe("The date when the Presenter's file was last updated."),
});

const presenterCollection = defineCollection({
    type: "content",
    schema: PresenterZod,
});

export const collections = {
    meetings: meetingCollection,
    presenters: presenterCollection,
};
