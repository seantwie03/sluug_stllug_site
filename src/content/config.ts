import { z, defineCollection } from 'astro:content';

const sluugCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        meetingDate: z.date(),
        pubDate: z.date(),
        image: z.object({
            url: z.string(),
            alt: z.string(),
        }),
        tags: z.array(z.string()),
    }),
});

export const collections = {
    sluug: sluugCollection,
};
