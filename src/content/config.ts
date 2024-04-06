import { defineCollection, z } from "astro:content";

const meetingCollection = defineCollection({
  type: "content",
  schema: z.object({
    meetingType: z.enum(["SLUUG", "STLLUG"]),
    meetingDate: z.date(),
    main: z.object({
      title: z.string(),
      presenter: z.string(),
      tags: z.array(z.string()),
    }),
    base: z
      .object({
        title: z.string(),
        presenter: z.string(),
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
    presenterName: z.string(),
    lastUpdated: z.date(),
    links: z.array(z.string()),
  }),
});

export const collections = {
  meetings: meetingCollection,
  presenters: presenterCollection,
};
