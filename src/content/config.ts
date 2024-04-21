import { defineCollection, z } from "astro:content";

const meetingCollection = defineCollection({
    type: "content",
    schema: z.object({
        meetingType: z.enum(["SLUUG", "STLLUG"]),
        meetingDate: z.date(),
        main: z.object({
            title: z.string(),
            presenterNames: z.array(z.string()),
            tags: z
                .array(z.string())
                .describe(
                    "The name of the presenter(s) formatted how it should be displayed on the website. Each item in this array must match a presenterName in the presenterCollection for the Presenter links on the Meeting pages to work.",
                ),
        }),
        base: z
            .object({
                title: z.string(),
                presenterNames: z
                    .array(z.string())
                    .describe(
                        "The name of the presenter(s) formatted how it should be displayed on the website. Each item in this array must match a presenterName in the presenterCollection for the Presenter links on the Meeting pages to work.",
                    ),
                tags: z.array(z.string()),
            })
            .optional(),
        youtubeUrl: z.string().optional(),
        meetupUrl: z.string().optional(),
    }),
});

const presenterCollection = defineCollection({
    type: "content",
    schema: z.object({
        presenterName: z
            .string()
            .describe(
                "The presenter's name formatted how it should be displayed on the website. Example: George R.R. Martin",
            ),
        lastUpdated: z
            .date()
            .describe("The date when the Presenter's file was last updated."),
    }),
});

export const collections = {
    meetings: meetingCollection,
    presenters: presenterCollection,
};
