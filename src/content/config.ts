import { defineCollection, z } from "astro:content";

export const MeetingTypeZod = z.enum(["SLUUG", "STLLUG"]);
export const PresentationZod = z.object({
    title: z.string(),
    presenterNames: z.array(z.string()),
    tags: z
        .array(z.string())
        .describe(
            "The name of the presenter(s) formatted how it should be displayed on the website. Each item in this array must match a presenterName in the presenterCollection for the Presenter links on the Meeting pages to work.",
        ),
});
export const MeetingSchemaZod = z.object({
    meetingType: MeetingTypeZod,
    meetingDate: z.date(),
    main: PresentationZod,
    base: PresentationZod.optional(),
    youtubeUrl: z.string().optional(),
    meetupUrl: z.string().optional(),
});
const meetingCollection = defineCollection({
    type: "content",
    schema: MeetingSchemaZod,
});

export const PresenterSchemaZod = z.object({
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
    schema: PresenterSchemaZod,
});

// Start: Option 1
export const LinksYamlZod = z.object({
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

export const PresentationYamlZod = z.object({
    title: z.string(),
    presenterNames: z.array(z.string()),
    tags: z.array(z.string()),
    abstract: z.string(),
    references: z.array(LinksYamlZod).optional(),
    tweets: z.array(z.string()).optional(),
});

export const ImageYamlZod = z.object({
    src: z.string(),
    alt: z.string(),
});
export const MeetingYamlSchemaZod = z.object({
    meetingType: MeetingTypeZod,
    meetingDate: z.date(),
    main: PresentationYamlZod,
    base: PresentationYamlZod.optional(),
    youtubeUrl: z.string().optional(),
    youtubeTitles: z.array(z.string()).optional(),
    meetupUrl: z.string().optional(),
    image: ImageYamlZod.optional(),
});

const meetingYamlCollection = defineCollection({
    type: "data",
    schema: MeetingYamlSchemaZod,
});
// END: Option 1

export const collections = {
    meetings: meetingCollection,
    meetingYaml: meetingYamlCollection,
    presenters: presenterCollection,
};
