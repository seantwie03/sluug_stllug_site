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

export const collections = {
    meetings: meetingCollection,
    presenters: presenterCollection,
};
